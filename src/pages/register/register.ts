import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{MyHttpService} from'../../app/utility/service/myhttp.service';
import {LoginPage} from '../login/login';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers:[MyHttpService]
})
export class RegisterPage {
  uname:string='';
  upwd:string='';
  upwd2:string='';
  email:string='';
  phone:string='';

  unameMsg:string='';
  upwdMsg:string='';
  upwdMsg2:string='';
  phoneMsg:string='';
  emailMsg:string='';

  isOk=0;

  constructor(public navCtrl: NavController,public myHttp: MyHttpService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  //1.检查用户名
  checkUname(){
    let reg=/^([\u4e00-\u9fa5]?|[a-zA-Z]?){1,10}$/;
    this.unameMsg= reg.test(this.uname)?'':'请输入4-10个汉字和字母组成的用户名格式';
    if(reg.test(this.uname)){
      this.myHttp.sendRequest("http://127.0.0.1/product_lanzhi/template/src/assets/data/user/check_uname.php?uname="+this.uname).subscribe((data:any)=>{
        if(data){
          if(data.code==201){this.unameMsg='该用户名已存在';}
        }
      })
    }
  }
  //2.检查密码
  checkUpwd(){
    let reg=/^\w{6,10}$/;
    this.upwdMsg= reg.test(this.upwd)?'':'请输入字母和数字组成的密码';
  }
  //3.确认密码
  checkUpwd2(){
    this.upwdMsg2=this.upwd==this.upwd2?"":"两次密码不一致";
  }
  //4.检查电话号码格式
  checkPhone(){
    let reg=/1[35784]\d{9}/;
    this.phoneMsg=reg.test(this.phone)?'':'请输入合格的手机号';
    if(reg.test(this.phone)){
      this.myHttp.sendRequest("http://127.0.0.1/product_lanzhi/template/src/assets/data/user/check_phone.php?phone="+this.phone).subscribe((data:any)=>{
        if(data){
          if(data.code==201){this.phoneMsg='该手机号已注册';}
        }
      })
    }
  }
  //5.检查邮箱
  checkEmail(){
    let reg=/^[a-zA-Z0-9]+@[a-zA-Z0-9]+(.com|.cn)$/;
    this.emailMsg=reg.test(this.email)?'':"请输入正确的邮箱格式";
    if(reg.test(this.email)){
      this.myHttp.sendRequest("http://127.0.0.1/product_lanzhi/template/src/assets/data/user/check_email.php?email="+this.email).subscribe((data:any)=>{
        if(data){
          if(data.code==201){this.emailMsg='该邮箱已注册';}
        }
      })
    }
  }
  //注册
  register(){
    if(!this.unameMsg&&!this.phoneMsg&&!this.emailMsg){
      this.myHttp.sendRequest("http://127.0.0.1/product_lanzhi/template/src/assets/data/user/register.php?uname="+this.uname+"&upwd="+this.upwd+"&phone="+this.phone+"&email="+this.email).subscribe((data:any)=>{
        if(data){
          console.log(data.code);
          this.isOk=1;
          data.code==200&&this.myHttp.showToast("注册成功");
        }
      })
    }else{
      this.myHttp.showToast("已被注册项请重填");
      return;
    }
  }
  //注册成功去登录
  login(){
    this.navCtrl.push(LoginPage);
  }


}
