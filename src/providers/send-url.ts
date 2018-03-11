import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Filters} from '../model/Filter';

@Injectable()
export class SendUrlService {
  private subject = new Subject<any>();
  url = new EventEmitter<string>();

  sendUrl(url: string) {
    this.subject.next(url);
    this.url.emit(url);
  }

  getUrl(): Observable<any> {
    return this.subject.asObservable();
  }

  getUrlParameters(filters: Filters) {
    let urlParameters = '';
    const filterKeys = Object.keys(filters);
    for (let i = 0; i < filterKeys.length; i++) {
      if (filters[filterKeys[i]].filter === undefined) {
        filterKeys.splice(i, 1);
        i = 0;
      }
    }
    for (let i = 0; i < filterKeys.length; i++) {
      const filter = filters[filterKeys[i]].filter;
      if (filter !== undefined) {
        if (filter.length > 1) {
          for (let j = 0; j < filter.length; j++) {
            if (j === 0) {
              urlParameters = urlParameters + '(';
            }
            if (filter[j].dateBefore !== undefined) {
              const afterBefore = filter[j].dateBefore ? '<' : '>';
              urlParameters = urlParameters + filterKeys[i] + afterBefore + filter[j].data;
            } else {
            urlParameters = urlParameters + filterKeys[i] + ':' + filter[j].data;
            }
            if (j !== filter.length - 1) {
              urlParameters = urlParameters + ' OR ';
            } else {
              urlParameters = urlParameters + ')';
            }
          }
          if (i !== filterKeys.length - 1) {
            urlParameters = urlParameters + ' AND ';
          }
        } else {
          if (filter[0].dateBefore !== undefined) {
            const afterBefore = filter[0].dateBefore ? '<' : '>';
            urlParameters = urlParameters + filterKeys[i] + afterBefore + filter[0].data;
          } else {
            urlParameters = urlParameters + filterKeys[i] + ':' + filter[0].data;
          }
          if (i !== filterKeys.length - 1) {
            urlParameters = urlParameters + ' AND ';
          }
        }
      }
    }
    return urlParameters;
  }
}
