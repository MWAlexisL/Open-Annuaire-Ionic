import {Component} from '@angular/core';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {File} from '@ionic-native/file';
import {AlertController, LoadingController, Platform} from 'ionic-angular';
import {SendUrlService} from '../../providers/send-url';
import {FirmApiProvider} from '../../providers/firm-api/firm-api';

declare var cordova: any;

@Component({
  selector: 'page-export',
  templateUrl: 'export.html',
  providers: [Transfer, TransferObject, File]
})
export class ExportPage {
  storageDirectory: string = '';
  params = '';
  nhits: number;

  constructor(private transfert: Transfer, private platfrom: Platform, private alertCtrl: AlertController, private sendUrlService: SendUrlService, private firmApiProvider: FirmApiProvider, private loadingCtrl: LoadingController) {
    this.sendUrlService.getUrl().subscribe(params => {
      this.params = params;
      this.firmApiProvider.searchCompanies(this.params, 0).subscribe(data => {
        this.nhits = data.nhits;

        console.log(this.nhits);
      });
    });
    if (this.platfrom.is('ios')) {
      this.storageDirectory = cordova.file.documentsDirectory
    }
    if (this.platfrom.is('android')) {
      this.storageDirectory = cordova.file.externalDataDirectory;
    }
  }

  export(format: string, allData?: boolean) {
    let loading = this.loadingCtrl.create({
      content: 'Téléchargement en cours...'
    });

    loading.present();

    const fileTransfert: TransferObject = this.transfert.create();
    const url = 'https://public.opendatasoft.com/explore/dataset/sirene/download/?format=' + ((format == 'json') ? format : format + '&use_labels_for_header=true') + ((allData) ? '' : '&q=' + this.params);

    fileTransfert.download(url, this.storageDirectory + (allData ? 'all' : '') +'download.'+format).then((entry) => {
      const alertSuccess = this.alertCtrl.create({
        title: `Fichier ${format} téléchargé.`,
        subTitle: `Le fichier .${format} à bien été téléchargé dans le path : ${entry.toURL()}`,
        buttons: ['Ok']
      });

      loading.dismiss();
      alertSuccess.present();

    }, (error) => {

      const alertFailure = this.alertCtrl.create({
        title: `Download Failed!`,
        subTitle: `Erreur lors du téléchargement. Error code: ${error.code}`,
        buttons: ['Ok']
      });
      loading.dismiss();
      alertFailure.present();

    });
  }
}
