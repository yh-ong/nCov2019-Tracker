import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-setting-period',
  templateUrl: './setting-period.page.html',
  styleUrls: ['./setting-period.page.scss'],
})
export class SettingPeriodPage implements OnInit {

  currentDate: string;
  formData: any = {};

  constructor(public alertController: AlertController, public toastController: ToastController, private storage: Storage, private datePipe: DatePipe) { }

  ngOnInit() {
    this.currentDate = new Date().toISOString();

    this.storage.get("MCO_PERIOD").then(val => {
      if (val != null) {
        this.formData.dateFrom = val[0].from;
        this.formData.dateUntil = val[0].until;
      } else {
        this.formData.dateFrom = "2020-3-18";
        this.formData.dateUntil = "2020-4-14";
      }
    });

  }

  saveData() {
    var arr  = [];
    if (this.formData.dateFrom != null && this.formData.dateUntil != null) {

      arr.push(
        {
          'from': this.datePipe.transform(this.formData.dateFrom, "y-M-d"),
          'until': this.datePipe.transform(this.formData.dateUntil, "y-M-d")
        }
      );

      this.storage.set('MCO_PERIOD', arr);
      this.presentSuccess();
    } else {
      this.presentError();
    }
  }

  async presentError() {
    const alert = await this.alertController.create({
      header: 'Required',
      message: 'Please select date',
      buttons: ['OK']
    });
    await alert.present();
  }
  
  async presentSuccess() {
    const toast = await this.toastController.create({
      position: 'top',
      color: 'success',
      message: 'Update Successful',
      duration: 2000
    });
    toast.present();
  }

}
