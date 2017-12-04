import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{MyHttpService} from'../../app/utility/service/myhttp.service';
import {HomePage} from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[MyHttpService]
})
export class LoginPage {
  uname:string='';
  upwd:string='';
  constructor(public navCtrl: NavController, public myHttp: MyHttpService,public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  //登录
  doLogin(){
    console.log(this.uname,this.upwd);
    this.myHttp.sendRequest('http://127.0.0.1/product_lanzhi/template/src/assets/data/user/login.php?uname='+this.uname+'&upwd='+this.upwd)
                .subscribe((data:any)=>{
                  if(data){
                    if(data.code==200){
                      this.myHttp.showToast('登录成功');
                      this.navCtrl.push(HomePage);
                    }else if(data.code==201){
                      this.myHttp.showToast('登录密码错误');
                      this.uname='';
                      this.upwd='';
                    }
                  }
                })
  }


}
