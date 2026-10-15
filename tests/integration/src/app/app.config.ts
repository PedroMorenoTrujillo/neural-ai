import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideNeuralUI } from '@neural-ui/core';
import { neuralAiPreset } from '../../../../skills/neural-ui/examples/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideNeuralUI({ locale: 'en', timeZone: 'UTC', theme: { preset: neuralAiPreset } }),
  ]
};
