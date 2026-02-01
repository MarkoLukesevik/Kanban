import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideBrowserGlobalErrorListeners(), provideAnimations(), provideToastr()],
};
