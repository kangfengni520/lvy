import { Component } from '@angular/core';
import { IonicPage,ViewController, NavController, NavParams } from 'ionic-angular';
import{MyHttpService} from'../../app/utility/service/myhttp.service';
import {LoginPage} from '../login/login';
import {IndexPage} from '../index/index';
import {OrderConfirmPage} from "../order-confirm/order-confirm";
/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  providers:[MyHttpService]
})
export class CartPage {
  isLogin:boolean=false;
  cartList:Array<any>=[];
  //选中的myIndex作为一个数组，用于计算总价
  myIndex:Array<any>=[];

  totalMoney:number=0;
  constructor(public viewCtrl:ViewController,public navCtrl: NavController,public myHttp: MyHttpService,  public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.checkLogin();
  }
  //未登录，点击登录跳到登录页
  jumpToLogin(){
    this.navCtrl.push(LoginPage);
  }
  //商品无列表跳到首页
  jumpToIndex(){
    this.navCtrl.push(IndexPage);

  }

  //检查是否登录
  checkLogin(){
    this.myHttp.sendRequest('http://127.0.0.1/product_lanzhi/template/src/assets/data/user/session_data.php')
                .subscribe((data:any)=>{
                  if(data) {
                    if(data.uid){
                      this.isLogin=true;
                      this.getCartInfo();//加载登录id的list购物车
                    }else{
                      this.isLogin=false;
                    }
                  }
                })
  }

  //获得登录id的list购物车信息
  getCartInfo(){
    this.myHttp.sendRequest('http://127.0.0.1/product_lanzhi/template/src/assets/data/cart/list.php')
                .subscribe((data:any)=>{
                  if(data){
                    this.cartList=data.data;
                  }
                })
  }

  //删除商品-->请求php
  deleteFromCart(index:number){
    this.myHttp.sendRequest("http://127.0.0.1/product_lanzhi/template/src/assets/data/cart/del.php?iid="+index).subscribe((data)=>{
      console.log(data);
    })
  }
  //计算总价
  getTotalPrice(){
    var totalMoney=0;
    for(var i in this.cartList){
      totalMoney+=parseFloat(this.cartList[i].price)*parseFloat(this.cartList[i].count);
    }
    return totalMoney;
  }

  //增加或删除商品,请求数据库，修改count数量
  modifyCount(isAdd:boolean,index:number,iid:number){
    let previousCount=this.cartList[index].count;
    if(isAdd){
      if(previousCount==1){ return}
      else previousCount--;
    }else{
      previousCount++;
    }
    this.cartList[index].count=previousCount;
    console.log(previousCount,"idd:"+iid);

    this.myHttp.sendRequest("http://127.0.0.1/product_lanzhi/template/src/assets/data/cart/update_count.php?iid="+iid+"&count="+previousCount)
                .subscribe((data:any)=>{
                  if(data){
                    if(data.code==200){
                      console.log("修改成功");
                    }
                  }
                })
  }
  //跳转到订单确认页面
  jumpToPay(){
    this.navCtrl.push(OrderConfirmPage);
  }
}
