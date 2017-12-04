import { Component } from '@angular/core';
import {ViewController, LoadingController,IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pay',
  templateUrl: 'pay.html',
})
export class PayPage {
  totalPirce:number=3000;

  constructor(public viewCtrl:ViewController,public LoadCtrl:LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayPage');
  }
  //关闭模态框
  showViewCtrl(){
    this.viewCtrl.dismiss();
  }
  //返回上一页
  goBack(){
    this.navCtrl.pop();
  }

  //显示load窗口
  showLoading(){
    let loading=this.LoadCtrl.create({
      content:'支付中...',
      duration:1000
    }).present()
  }
}
