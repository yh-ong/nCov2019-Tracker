import { Component } from '@angular/core';
import { ProviderService } from '../services/provider.service';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  timeStatus: string;

  curDate = new Date();
  startDate: Date;
  endDate: Date;
  dayStart: number;
  dayEnd: number;
  displayStartDate: string;
  displayEndDate: string;

  totalConfirmed: any;
  totalDeaths: any;
  totalRecovered: any;
  locationMalaysia: any;

  constructor(private providerSvc: ProviderService, private datePipe: DatePipe, private storage: Storage) {
    setInterval(() => {
      this.storage.get('MCO_PERIOD').then(val => {
        if (val != null) {
          this.startDate = new Date(val[0].from);
          this.endDate = new Date(val[0].until);
          this.countPeriod();
        } else {
          this.startDate = new Date('2020-3-18');
          this.endDate = new Date('2020-4-14');
          this.countPeriod();
        }
      });
    },1000)

    this.getData();
    this.showTimeStatus();
  }

  countPeriod() {
    let dayBtwStart = this.curDate.getTime() - this.startDate.getTime();
    let dayBtwEnd = this.endDate.getTime() - this.curDate.getTime();

    this.dayStart = Math.round(Math.abs(dayBtwStart / (1000 * 60 * 60 * 24)));
    this.dayEnd = Math.round(Math.abs(dayBtwEnd / (1000 * 60 * 60 * 24))) + 1;

    this.displayStartDate = this.datePipe.transform(this.startDate, 'MMM dd, yyyy');
    this.displayEndDate = this.datePipe.transform(this.endDate, 'MMM dd, yyyy');
  }

  getData() {
    this.providerSvc.getData(this.providerSvc.API_URL).subscribe(
      res => {
        this.locationMalaysia = res['Malaysia'];

        let lastNumberObject = Object.keys(this.locationMalaysia).length - 1;
        this.totalConfirmed = this.locationMalaysia[lastNumberObject].confirmed;
        this.totalDeaths = this.locationMalaysia[lastNumberObject].deaths;
        this.totalRecovered = this.locationMalaysia[lastNumberObject].recovered;
      }, err => {
        console.log("Error: ", err);
      }
    )
  }

  showTimeStatus() {
    let currentTimes = this.datePipe.transform(this.curDate, 'HH:mm:ss');
    if (currentTimes >= '05:00:00' && currentTimes <= '12:00:00') {
      this.timeStatus = "Good Morning!";
    } else if (currentTimes > '12:00:00' && currentTimes <= '18:00:00' ) {
      this.timeStatus = "Good Afternoon!";
    } else {
      this.timeStatus = "Good Evening!";
    }
  }

}
