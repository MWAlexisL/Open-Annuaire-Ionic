import {Component, OnInit} from '@angular/core';
import {Constants, Filter, Filters} from '../../model/Filter';
import {FirmApiProvider} from '../../providers/firm-api/firm-api';
import {SendUrlService} from '../../providers/send-url';

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
export class FilterComponent{

  countResultat: number;
  filters = new Filters();
  constants = new Constants;
  revenues = this.constants.revenues;
  categories = this.constants.categories;
  effectifs = this.constants.effectifs;
  params= '';

  constructor(private firmApiService: FirmApiProvider, private sendUrlService: SendUrlService) {
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
      this.firmApiService.searchCompanies(param, 0).subscribe(data => {
        newFilter.nhits = data.nhits;
      });
      this.filters[filter].filter.push(newFilter);


      this.params = this.sendUrlService.getUrlParameters(this.filters);
      this.sendUrlService.sendUrl(this.params);
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

    this.params = this.sendUrlService.getUrlParameters(this.filters);
    this.sendUrlService.sendUrl(this.params);
  }

  findEffectif(arrayLibelle, value) {
    let array;
    if (arrayLibelle === 'categorie') {
      array = this.categories;
    } else {
      array = this.effectifs;
    }
    return array.find(function (element) {
      return element.value === value;
    }).libelle;
  }

}
