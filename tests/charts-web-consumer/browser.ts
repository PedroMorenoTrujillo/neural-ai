import '@angular/compiler';
import { createComponent } from '@angular/core';
import { createApplication } from '@angular/platform-browser';
import { createElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createApp } from 'vue';
import { VisitsChart as AngularVisits } from './line-angular.js';
import { VisitsChart as ReactVisits } from './line-react.js';
import { mountVisits } from './line-web.js';
import { VisitsChart as VueVisits } from './line-vue.js';

const web = document.querySelector<HTMLElement>('#web')!;
const cleanup = mountVisits(web, 'web-visits');
document.querySelector('#dispose')!.addEventListener('click', cleanup, { once: true });

const angular = document.querySelector<HTMLElement>('#angular')!;
const application = await createApplication();
const visits = createComponent(AngularVisits, { environmentInjector: application.injector, hostElement: angular });
visits.setInput('instanceId', 'angular-visits');
application.attachView(visits.hostView);
visits.changeDetectorRef.detectChanges();

const react = document.querySelector<HTMLElement>('#react')!;
const root = createRoot(react);
root.render(createElement(StrictMode, null, createElement(ReactVisits)));
document.querySelector('#unmount')!.addEventListener('click', () => root.unmount(), { once: true });

const vue = createApp(VueVisits);
vue.mount(document.querySelector<HTMLElement>('#vue')!);
document.querySelector('#unmount-vue')!.addEventListener('click', () => vue.unmount(), { once: true });
