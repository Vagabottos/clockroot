import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { Observable, of } from 'rxjs';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FactionMenuComponent } from './faction-menu/faction-menu.component';
import { PriorityModalComponent } from './priority-modal/priority-modal.component';

import * as enUS from '../assets/i18n/en-US.json';
import * as frFR from '../assets/i18n/fr-FR.json';
import * as esES from '../assets/i18n/es-ES.json';

const langs = { 
  'en-US': (enUS as any).default || enUS, 
  'fr-FR': (frFR as any).default || frFR,
  'es-ES': (esES as any).default || esES,
  'de-DE': (deDE as any).default || deDE  
};

export class JSONLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(langs[lang] || enUS);
  }
}

@NgModule({
  declarations: [FactionMenuComponent, PriorityModalComponent, AppComponent],
  bootstrap: [AppComponent],
  entryComponents: [FactionMenuComponent, PriorityModalComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: JSONLoader
      }
    }),

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class AppModule {}
