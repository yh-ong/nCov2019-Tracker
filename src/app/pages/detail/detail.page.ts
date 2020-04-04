import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProviderService } from 'src/app/services/provider.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  @ViewChild("lineCanvas", {static: true}) lineCanvas: ElementRef;
  @ViewChild("deathslineCanvas", {static: true}) dlineCanvas: ElementRef;
  @ViewChild("recoveredlineCanvas", {static: true}) recoverlineCanvas: ElementRef;

  countryId = null;
  location: any;
  totalConfirmed: any;
  totalDeaths: any;
  totalRecovered: any;
  arrayData: any;

  private lineChart: Chart;
  private deathslineChart: Chart;
  private recoveredlineChart: Chart;

  constructor(private activatedRoutes: ActivatedRoute, private providerSvc: ProviderService) { }

  ngOnInit() {
    this.getDetailsData();
  }

  getDetailsData() {
    this.countryId = this.activatedRoutes.snapshot.paramMap.get('id');

    this.providerSvc.getData(this.providerSvc.API_URL).subscribe(res => {
      this.location = res[this.countryId];
      
      var result = this.groupByMonth();
      console.log(result);
      this.displayGraph(result);

      let lastNumberObject = Object.keys(this.location).length - 1;
      this.totalConfirmed = this.location[lastNumberObject].confirmed;
      this.totalDeaths = this.location[lastNumberObject].deaths;
      this.totalRecovered = this.location[lastNumberObject].recovered;
    });
  }

  groupByMonth() {
    var months = [];
    var data = this.location;
    for (var i in data) {
      var obj = data[i];
      var date = new Date(obj.date);
      var month = date.getMonth();

      var eachMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

      if (months[month]) {
        months[month].push(obj);
      } else {
        months[month] = [obj];
      }
    }
    return months;
  }

  displayGraph(byMonthData) {
    
    var confirmedDetails = [];
    var deathsDetails = [];
    var recoveredDetails = [];

    for (var i in byMonthData) {
      var byMonth = byMonthData[i];
      var lastJanuaryObject = Object.keys(byMonth).length - 1;

      confirmedDetails[i] = byMonth[lastJanuaryObject].confirmed;
      deathsDetails[i] = byMonth[lastJanuaryObject].deaths;
      recoveredDetails[i] = byMonth[lastJanuaryObject].recovered;
    }

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "#F7A278",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: confirmedDetails,
            spanGaps: false
          }
        ]
      }
    });
    
    this.deathslineChart = new Chart(this.dlineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "#EE4266",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: deathsDetails,
            spanGaps: false
          }
        ]
      }
    });

    this.recoveredlineChart = new Chart(this.recoverlineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "#21D19F",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: recoveredDetails,
            spanGaps: false
          }
        ]
      }
    });

  }

}
