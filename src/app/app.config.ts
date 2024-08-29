import { ApplicationConfig, provideZoneChangeDetection, TRANSLATIONS } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpErrorInterceptorService } from './services/httperror-interceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
   provideRouter(routes),
    provideHttpClient( withInterceptorsFromDi(),), provideAnimationsAsync(), provideAnimationsAsync(),{
      provide:HTTP_INTERCEPTORS,
      useClass:HttpErrorInterceptorService,
      multi:true
    }
  ]
};
