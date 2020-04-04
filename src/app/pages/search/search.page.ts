import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  countryItems: any;

  constructor(private providerSvc: ProviderService, private router: Router) { }

  ngOnInit() {
    this.getCountry();
  }

  getCountry() {
    this.providerSvc.getData(this.providerSvc.API_URL).subscribe(
      res => {
      this.countryItems = Object.keys(res);
    }, err => {
      console.log(err);
    });
  }

  onSearch(searchData:any) {
    const val = searchData.target.value;
    if (val && val.trim() != '') {
      this.countryItems = this.countryItems.filter((item) => {
        var itemname = item;
        return (itemname.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    } else {
      this.getCountry();
    }
  }

}
