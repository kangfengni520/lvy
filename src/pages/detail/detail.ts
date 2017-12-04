import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{MyHttpService} from'../../app/utility/service/myhttp.service';
import {LoginPage} from '../login/login'
import {NotFoundPage} from '../not-found/not-found'
import {CartPage} from '../cart/cart'
/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
  providers:[MyHttpService]
})
export class DetailPage {
  picList:Array<any>=[];
  id:number;
  detailinfo:any;
  constructor(public navCtrl: NavController,public myHttp: MyHttpService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
    let myId:number=this.navParams.get('id');
    this.id=myId;
    this.loadDate(myId);

  }
  loadDate(id:any){
    console.log(id);
    this.myHttp.sendRequest('http://127.0.0.1/product_lanzhi/template/src/assets/data/product/details.php?lid='+id)
                .subscribe((data:any)=>{
                  if(data){
                    console.log(data);
                    this.picList=data.details.picList;
                    console.log(this.picList);
                    this.detailinfo=data.details;
                  }
                })
  }
  //跳到notfound页面
  jumpToNotFound(){
    this.navCtrl.push(NotFoundPage);
  }

  //跳到购物车页面
  jumpToCart(){
    this.navCtrl.push(CartPage);
  }

  //添加到购物车
  addToCart(){
    // console.log(this.id);
    this.myHttp.sendRequest('http://127.0.0.1/product_lanzhi/template/src/assets/data/cart/add.php?buyCount=1&lid='+this.id)
                .subscribe((data)=>{
                  // console.log(data);
                  if(data.code==300){
                    this.myHttp.showToast('请先登录');
                    this.navCtrl.push(LoginPage);
                  }else if(data.code==200){
                    this.myHttp.showToast('添加成功');
                  }else if(data.code==500){
                    this.myHttp.showToast('因网络问题，添加失败');
                  }
                })
  }
}
