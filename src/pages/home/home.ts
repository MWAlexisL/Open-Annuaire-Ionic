import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DetailCompanyPage} from '../detail-company/detail-company';
import {FirmApiProvider} from '../../providers/firm-api/firm-api';
import {CompanyInterface} from '../../providers/firm-api/firm-api-interface';
import {SendUrlService} from '../../providers/send-url';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  subscription: Subscription;
  items: CompanyInterface[] = [];
  nhits: number;
  params = '';

  constructor(public navCtrl: NavController, public firmApiProvider: FirmApiProvider, private sendUrlService: SendUrlService) {
    this.firmApiProvider.searchCompanies(this.params, 30).subscribe(data => {
      this.nhits = data.nhits;
      for (let i = 0; i < data.records.length; i++) {
        this.items.push(data.records[i]);
      }
    });
    this.subscription = this.sendUrlService.getUrl().subscribe(url => {
      this.items = [];
      this.params = url;
      this.firmApiProvider.searchCompanies(this.params, 30).subscribe(data => {
        this.nhits = data.nhits;
        for (let i = 0; i < data.records.length; i++) {
          this.items.push(data.records[i]);
        }
      });
    });
  }

  public goToDetailCompany(item) {
    this.navCtrl.push(DetailCompanyPage, {item: item});
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {
      this.firmApiProvider.searchCompanies('', 30, this.items.length).subscribe(data => {
        for (let i = 0; i < data.records.length; i++) {
          this.items.push(data.records[i]);
          infiniteScroll.complete();
        }
      });
    }, 500);
  }
}
