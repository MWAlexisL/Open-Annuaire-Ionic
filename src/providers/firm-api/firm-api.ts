import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {FirmApiCompaniesInterface} from './firm-api-interface';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the FirmApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirmApiProvider {

  constructor(public http: HttpClient) {
  }

  searchCompanies(param: string, rows?: number, start?: number): Observable<FirmApiCompaniesInterface> {
    let firmUrl = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=sirene';
    if (rows !== undefined) {
      firmUrl = firmUrl + '&rows=' + rows;
    }
    if (start !== undefined) {
      firmUrl = firmUrl + '&start=' + start;
    }
    firmUrl = firmUrl + '&q=' + param;
    return this.http.get(firmUrl).map(response => response as FirmApiCompaniesInterface);
  }
}
