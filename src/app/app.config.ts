import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http'; // Import withInterceptorsFromDi if using class-based interceptors
import { routes } from './app.routes';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()), // Enable router input binding
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch()), // Use withFetch or standard HttpClient
    // Optional: Provide default options for Material form fields
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', subscriptSizing: 'dynamic' } }
    // If using class-based HTTP interceptors: importProvidersFrom(HttpClientModule), provideHttpClient(withInterceptorsFromDi()), // provide interceptors
  ]
};
