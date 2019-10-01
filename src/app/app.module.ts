import { EvolucaopacientePage } from './../pages/evolucaopaciente/evolucaopaciente';
import { LoginPage } from './../pages/login/login';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environments';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonicStorageModule } from '@ionic/storage';

import { AngularFireDatabase } from '@angular/fire/database';
import { ComponentsModule } from '../components/components.module';




@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    EvolucaopacientePage,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    EvolucaopacientePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireAuth,
    AngularFireDatabase,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
