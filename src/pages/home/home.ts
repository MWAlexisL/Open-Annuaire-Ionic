import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DetailCompanyPage} from '../detail-company/detail-company';
import {FirmApiProvider} from '../../providers/firm-api/firm-api';
import {CompanyInterface} from '../../providers/firm-api/firm-api-interface';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  items: CompanyInterface[] = [];
  nhits: number;

  constructor(public navCtrl: NavController, public firmApiProvider: FirmApiProvider) {
    this.firmApiProvider.searchCompanies('', 30).subscribe(data => {
      this.nhits = data.nhits;
      for (let i=0; i < data.records.length; i++) {
        console.log(data.records[i]);
        this.items.push(data.records[i]);
      }
    });
  }

  public goToDetailCompany(item) {
    this.navCtrl.push(DetailCompanyPage, {item: item});
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.firmApiProvider.searchCompanies('', 30, this.items.length).subscribe(data => {
        for (let i = 0; i < data.records.length; i++) {
          console.log(data.records[i]);
          this.items.push(data.records[i]);
          infiniteScroll.complete();
        }
      });
    }, 500);
  }
}
