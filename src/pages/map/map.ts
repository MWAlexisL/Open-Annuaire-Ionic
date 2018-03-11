import {Component} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {SendUrlService} from '../../providers/send-url';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  subscription: Subscription;
  mapUrl: SafeResourceUrl;

  constructor(private sendUrlService: SendUrlService, private sanitizer: DomSanitizer) {
    this.subscription = this.sendUrlService.getUrl().subscribe(data => {
      this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://public.opendatasoft.com/explore/embed/dataset/sirene/map/?q=' + data);
    });
  }

}
