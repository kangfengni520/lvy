import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{MyHttpService} from'../../app/utility/service/myhttp.service';
import{DetailPage}from'../detail/detail';
/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
   providers:[MyHttpService]
})
export class IndexPage {
  carouselItems:Array<any>=[];
  recommendedItems:Array<any>=[];
  newArrivalItems:Array<any>=[];
  datailPage=DetailPage;
  constructor(public navCtrl: NavController,public myHttp: MyHttpService, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
    this.getData();
  }
  //向index.php发起网络请求index数据
  getData(){
    this.myHttp.sendRequest('http://127.0.0.1/product_lanzhi/template/src/assets/data/product/index.php')
                .subscribe((data:any)=>{
                  if(data){
                    console.log(data);
                    this.carouselItems=data.carouselItems;
                    this.recommendedItems=data.recommendedItems;
                    this.newArrivalItems=data.newArrivalItems;
                    console.log(this.recommendedItems[1].pid)
                  }
                })
  }

  // 跳到详情页
  jumpToDetail(myIndex:number){
    this.navCtrl.push(
      DetailPage,
      {id:this.recommendedItems[myIndex].pid}
      );
    console.log(this.recommendedItems[myIndex].pid);
  }
}
