import { Component } from '@angular/core';
import { IonicPage,ModalController, NavController, NavParams } from 'ionic-angular';
import{MyHttpService} from'../../app/utility/service/myhttp.service';
import {LoginPage} from '../login/login';
import {PayPage} from '../pay/pay';
/**
 * Generated class for the OrderConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-order-confirm',
  templateUrl: 'order-confirm.html',
  providers:[MyHttpService]
})
export class OrderConfirmPage {
  detailList:Array<any>=[];
  sumPrice:number=0;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController,public myHttp:MyHttpService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderConfirmPage');
    this.loadDetail();
  }
  //请求list数据
  loadDetail(){
    this.myHttp.sendRequest('http://127.0.0.1/product_lanzhi/template/src/assets/data/cart/list.php')
      .subscribe((data)=>{
        console.log(data);
        if(data){
          if(data.code==300){
            this.myHttp.showToast('请先登录');
            this.navCtrl.push(LoginPage);
          }else if(data.code==200){
            console.log(data.data);
            this.detailList=data.data;
            for(var i=0;i<this.detailList.length;i++){
              this.sumPrice+=this.detailList[i].price*this.detailList[i].count;
            }
          }
        }
      })
  }

  //显示支付模态框
  jumpToPay(){
    this.modalCtrl.create(PayPage).present();
  }

  //计算总价
  totalPirce(){
    for(var i=0;i<this.detailList.length;i++){
      console.log(this.detailList[i]);
      this.sumPrice+=this.detailList[i].price*this.detailList[i].count;
    }
  }
}
