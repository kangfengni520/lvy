import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {IndexPage} from '../index/index';
/**
 * Generated class for the NotFoundPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-not-found',
  templateUrl: 'not-found.html',
})
export class NotFoundPage {
  time:number=5;
  timer:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotFoundPage');
    this.timer=setInterval(()=>{
      this.time--;
      if(this.time==0){
        clearInterval(this.timer);
        this.navCtrl.push(IndexPage);
        this.timer=null;
      }
    },1000)
  }
  ionViewWillLeave(){
    if(this.timer){
      clearInterval(this.timer);
      this.timer=null;
    }
  }

}
