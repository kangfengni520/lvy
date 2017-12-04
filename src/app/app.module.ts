import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import {HttpModule} from '@angular/http';
import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';

import {FormsModule} from '@angular/forms';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import{MyHttpService}from'./utility/service/myhttp.service';

import {HomePage} from '../pages/home/home';
import {IndexPage} from '../pages/index/index';
import {UserCenterPage} from '../pages/user-center/user-center';
import {CartPage} from '../pages/cart/cart';
import {NotFoundPage} from '../pages/not-found/not-found';
import {LoginPage} from '../pages/login/login';
import {DetailPage} from '../pages/detail/detail';
import {OrderConfirmPage} from '../pages/order-confirm/order-confirm';
import {PayPage} from '../pages/pay/pay';
import {RegisterPage} from '../pages/register/register';
@NgModule({
  declarations: [
    MyApp,HomePage,IndexPage,UserCenterPage,NotFoundPage,CartPage,LoginPage,DetailPage,OrderConfirmPage,PayPage,RegisterPage,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage
  ],
  imports: [
    BrowserModule,HttpModule,FormsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,HomePage,IndexPage,UserCenterPage,NotFoundPage,CartPage,LoginPage,DetailPage,OrderConfirmPage,PayPage,RegisterPage,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},HttpModule
  ]
})
export class AppModule {}
