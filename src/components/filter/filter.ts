import {Component} from '@angular/core';
import {Constants, Filter, Filters} from '../../model/Filter';
import {FirmApiProvider} from '../../providers/firm-api/firm-api';
import {SendUrlService} from '../../providers/send-url';
import {LoadingController} from 'ionic-angular';

/**
 * Generated class for the FilterComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'filter',
  templateUrl: 'filter.html'
})
export class FilterComponent {

  countResultat: number;
  filters = new Filters();
  constants = new Constants;
  tcas = this.constants.revenues;
  categories = this.constants.categories;
  tefets = this.constants.effectifs;
  params = '';

  constructor(private firmApiService: FirmApiProvider, private sendUrlService: SendUrlService, private loadingCtrl: LoadingController) {
  }

  addFilter(filter, value, dateBefore?) {
    this.filters[filter].visible = false;
    let param;
    if (this.filters[filter].filter === undefined) {
      this.filters[filter].filter = [];
    }

    if (this.checkIfFilterExists(filter, value) === undefined) {
      const newFilter = new Filter();
      newFilter.data = value;
      if (dateBefore !== undefined) {
        newFilter.dateBefore = dateBefore;
        param = dateBefore ? (filter + '<' + value) : (filter + '>' + value);
      } else {
        param = filter + ':' + value;
      }
      let loading = this.loadingCtrl.create({
        content: 'Chargement en cours...'
      });

      loading.present();

      this.firmApiService.searchCompanies(param, 0).subscribe(data => {
        newFilter.nhits = data.nhits;
        loading.dismiss();
      });
      this.filters[filter].filter.push(newFilter);


      this.params = this.sendUrlService.getUrlParameters(this.filters);
      this.sendUrlService.sendUrl(this.params);
    }
  }

  changeSelect(filter, value) {
    this.filters[filter].visible = false;
    this.filters[filter].filter = [];
    let param;

    let loading = this.loadingCtrl.create({
      content: 'Chargement en cours...'
    });

    loading.present();
    if (value.length !== 0) {
      for (let i = 0; i < value.length; i++) {
        if (this.checkIfFilterExists(filter, value[i]) === undefined) {
          const newFilter = new Filter();
          newFilter.data = value[i];
          param = filter + ':' + value[i];
          this.firmApiService.searchCompanies(param, 0).subscribe(data => {
            newFilter.nhits = data.nhits;
            if (i + 1 === value.length) {
              loading.dismiss();
            }
          });
          this.filters[filter].filter.push(newFilter);

          this.params = this.sendUrlService.getUrlParameters(this.filters);
          this.sendUrlService.sendUrl(this.params);
        }
      }
    } else {
      this.removeFilter(filter);
      loading.dismiss();
    }
  }

  checkIfFilterExists(filter, value) {
    if (this.filters[filter].filter === undefined) {
      return undefined;
    }
    return this.filters[filter].filter.find(function (element) {
      return element.data === value;
    });
  }

  removeFilter(filter?, index?) {
    this.filters[filter].filter.splice(index, 1);
    if (this.filters[filter].filter.length === 0) {
      delete this.filters[filter].filter;
    }
    let loading = this.loadingCtrl.create({
      content: 'Chargement en cours...'
    });

    loading.present();
    this.firmApiService.searchCompanies(this.params, 0).subscribe(data => {
      loading.dismiss();
    });

    this.params = this.sendUrlService.getUrlParameters(this.filters);
    this.sendUrlService.sendUrl(this.params);
  }

  findEffectif(arrayLibelle, value) {
    let array;
    if (arrayLibelle === 'categorie') {
      array = this.categories;
    } else {
      array = this.tefets;
    }
    let selectedOption = array.find(function (element) {
      return element.value == value;
    });
    return selectedOption.libelle;
  }

}
