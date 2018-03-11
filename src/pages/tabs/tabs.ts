import {Component} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {SendUrlService} from '../../providers/send-url';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  params = '';

  constructor(private sendUrlService: SendUrlService) {
    this.sendUrlService.getUrl().subscribe(data => this.params = data);
  }

  xD() {
    this.sendUrlService.sendUrl(this.params);
  }
}
