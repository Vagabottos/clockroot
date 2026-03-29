import '@angular/compiler';
import { importProvidersFrom } from '@angular/core';

import { JSONLoader } from './app/translate-loader';
import { environment } from './environments/environment';
import {
  PreloadAllModules,
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
} from '@angular/router';
import {
  AlertController,
  IonicRouteStrategy,
  ModalController,
} from '@ionic/angular';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideServiceWorker } from '@angular/service-worker';
import { addIcons } from 'ionicons';
import {
  add,
  arrowForward,
  checkmarkCircle,
  radioButtonOff,
  refresh,
  remove,
  shuffle,
  trash,
} from 'ionicons/icons';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

addIcons({
  add,
  arrowForward,
  checkmarkCircle,
  radioButtonOff,
  refresh,
  remove,
  shuffle,
  trash,
});

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideIonicAngular({}),
    AlertController,
    ModalController,
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
    }),
    importProvidersFrom(
      FormsModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useClass: JSONLoader,
        },
      }),
    ),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
}).catch((err) => console.log(err));
