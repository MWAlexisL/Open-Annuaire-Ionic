import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SuperTabsModule} from 'ionic2-super-tabs';
import {FilterComponent} from '../components/filter/filter';
import {DetailCompanyPage} from '../pages/detail-company/detail-company';
import {FirmApiProvider} from '../providers/firm-api/firm-api';
import {HttpClientModule} from '@angular/common/http';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {SendUrlService} from '../providers/send-url';
import {MapPage} from '../pages/map/map';
import {ExportPage} from '../pages/export/export';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    ExportPage,
    HomePage,
    TabsPage,
    FilterComponent,
    DetailCompanyPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    ExportPage,
    HomePage,
    DetailCompanyPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirmApiProvider,
    HttpClientModule,
    SendUrlService
  ]
})
export class AppModule {
}
