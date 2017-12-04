import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{MyHttpService} from'../../app/utility/service/myhttp.service';
import {LoginPage} from '../login/login';
import {RegisterPage} from '../register/register';
/**
 * Generated class for the UserCenterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-center',
  templateUrl: 'user-center.html',
  providers:[MyHttpService]
})
export class UserCenterPage {

  constructor(public navCtrl: NavController, public myHttp: MyHttpService,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserCenterPage');
  }

  //退出登录
  logout(){
    this.myHttp.sendRequest("http://127.0.0.1/product_lanzhi/template/src/assets/data/user/logout.php")
                .subscribe((data:any)=>{
                  if(data){
                    if(data.code==200){
                      this.myHttp.showToast("退出成功")
                    }
                  }

                })
  }
  //跳转到登录页
  login(){
    this.navCtrl.push(LoginPage);
  }

  //跳转到注册页
  register(){
    this.navCtrl.push(RegisterPage);
  }
}
