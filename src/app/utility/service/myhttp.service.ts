import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ToastController,LoadingController} from 'ionic-angular';
@Injectable()
export class MyHttpService {
    constructor(private http: Http,private loadCtrl:LoadingController,private toast:ToastController) { }
    sendRequest(myUrl:any){
        return this.http.get(myUrl, { withCredentials: true })
            .map((response: Response) => response.json());
    }

    showToast(msg:string){
        let toastLoading=this.toast.create({
            message:msg,
            duration:2000,
            position:'bottom'
        }).present();
    }
}