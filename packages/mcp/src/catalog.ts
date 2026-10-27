import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

export interface Contract {
  name: string;
  kind: string;
  angularKind?: 'component' | 'directive';
  selector?: string;
  inputs?: { name: string; alias: string; required: boolean; type: string }[];
  outputs?: { name: string; alias: string; type: string }[];
  [key: string]: unknown;
}
export interface Entry { types: string; sha256: string; symbols: Contract[] }
export interface Document { id: string; source: string; text: string }
export interface Catalog {
  schemaVersion: number;
  api: { package: string; version: string; entrypoints: Record<string, Entry>; tokens: unknown; assets: unknown };
  documents: Document[];
  examples: Document[];
}

export type Library = 'web' | 'native';
export function loadCatalog(library: Library = 'web'): Catalog {
  if (library !== 'web' && library !== 'native') throw new Error('Unsupported library');
  // Fixed package-relative paths only. Tool arguments never reach the filesystem.
  const bytes = readFileSync(new URL(library === 'native' ? '../data/native-catalog.json' : '../data/catalog.json', import.meta.url));
  const expected = readFileSync(new URL(library === 'native' ? '../data/native-sha256' : '../data/sha256', import.meta.url), 'utf8').trim();
  if (createHash('sha256').update(bytes).digest('hex') !== expected) throw new Error('Catalogue integrity check failed');
  const data = JSON.parse(bytes.toString()) as Catalog;
  const pkg = library === 'native' ? '@neural-ui/native' : '@neural-ui/core';
  const version = library === 'native' ? '0.1.0-beta.2' : '2.0.3';
  if (data.schemaVersion !== 1 || data.api.package !== pkg || data.api.version !== version) {
    throw new Error('Unsupported catalogue');
  }
  return data;
}

export function components(catalog: Catalog, query = '', kind = 'all') {
  const needle = query.toLowerCase();
  const entries = Object.entries(catalog.api.entrypoints).filter(([entrypoint]) => catalog.api.package !== '@neural-ui/native' || entrypoint !== catalog.api.package);
  return entries.flatMap(([entrypoint, entry]) => entry.symbols
    .filter(symbol => symbol.angularKind && (kind === 'all' || symbol.angularKind === kind))
    .map(symbol => ({ entrypoint, name: symbol.name, kind: symbol.angularKind!, selector: symbol.selector! })))
    .filter(item => `${item.name} ${item.selector} ${item.entrypoint}`.toLowerCase().includes(needle))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function search(catalog: Catalog, query: string, limit = 5) {
  const words = [...new Set(query.toLowerCase().match(/[\p{L}\p{N}_-]+/gu) ?? [])];
  if (!words.length) return [];
  return catalog.documents.flatMap(doc => {
    // Split on headings outside fenced code blocks, preserving complete examples.
    const chunks: { heading: string; text: string }[] = [];
    let heading = doc.id;
    let lines: string[] = [];
    let fenced = false;
    for (const line of doc.text.split('\n')) {
      if (/^```/.test(line)) fenced = !fenced;
      if (!fenced && /^#{1,6} /.test(line)) {
        if (lines.length) chunks.push({ heading, text: lines.join('\n') });
        heading = line.replace(/^#+ /, '');
        lines = [];
      }
      lines.push(line);
    }
    if (lines.length) chunks.push({ heading, text: lines.join('\n') });
    return chunks.map(chunk => {
      const body = chunk.text.toLowerCase();
      const title = chunk.heading.toLowerCase();
      const score = words.reduce((sum, word) => sum + (body.includes(word) ? 1 : 0) + (title.includes(word) ? 3 : 0), 0);
      const positions = words.map(word => body.indexOf(word)).filter(index => index >= 0);
      const start = Math.max(0, Math.min(...positions) - 160);
      return { id: doc.id, source: doc.source, heading: chunk.heading, score,
        uri: `${catalog.api.package === '@neural-ui/native' ? 'neural-native' : 'neural-ui'}://docs/${doc.id}`, excerpt: chunk.text.slice(start, start + 1800) };
    });
  }).filter(hit => hit.score > 0).sort((a, b) => b.score - a.score || a.id.localeCompare(b.id)).slice(0, limit);
}
