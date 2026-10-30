
export default {
  basePath: '/',
  allowedHosts: [
  "127.0.0.1",
  "localhost"
],
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
