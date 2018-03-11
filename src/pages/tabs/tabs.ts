import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import {SendUrlService} from '../../providers/send-url';
import {MapPage} from '../map/map';
import {ExportPage} from '../export/export';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = ExportPage;
  params = '';

  constructor(private sendUrlService: SendUrlService) {
    this.sendUrlService.getUrl().subscribe(data => this.params = data);
  }

  xD() {
    this.sendUrlService.sendUrl(this.params);
  }
}
