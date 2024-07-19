import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(withInterceptors([authInterceptor]))
    ]
};

// provideHttpClient(withInterceptors([AuthInterceptor]))
// {
//   provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
// }