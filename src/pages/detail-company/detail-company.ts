import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {CompanyInterface} from '../../providers/firm-api/firm-api-interface';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

/**
 * Generated class for the DetailCompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail-company',
  templateUrl: 'detail-company.html',
})
export class DetailCompanyPage {
  item: CompanyInterface;
  mapUrl: SafeResourceUrl;

  constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform, private sanitizer: DomSanitizer) {
    this.item = navParams.get('item');
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://public.opendatasoft.com/explore/embed/dataset/sirene/map/?q=siret:' + this.item.fields.siret);
  }


}
