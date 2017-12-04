import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {IndexPage} from '../index/index';
import {UserCenterPage} from '../user-center/user-center';
import {CartPage} from '../cart/cart';
import {NotFoundPage} from '../not-found/not-found';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  indexPage=IndexPage;
  userCenterPage=UserCenterPage;
  cartPage=CartPage;
  notFoundPage=NotFoundPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

}
