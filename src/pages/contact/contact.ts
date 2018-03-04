import {Component} from '@angular/core';
import {Transfer, TransferObject} from '@ionic-native/transfer';
import {File} from '@ionic-native/file';
import {AlertController, Platform} from 'ionic-angular';

declare var cordova: any;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers: [Transfer, TransferObject, File]
})
export class ContactPage {

  gay = ['uuu', 'xD'];
  storageDirectory: string = '';

  constructor(private transfert: Transfer, private platfrom: Platform, private alertCtrl: AlertController, private file: File) {
    if (this.platfrom.is('ios')) {
      this.storageDirectory = cordova.file.documentsDirectory
    }
    if (this.platfrom.is('android')) {
      this.storageDirectory = cordova.file.externalDataDirectory;
    }
  }

  xD() {
    const fileTransfert: TransferObject =  this.transfert.create();
    const imageLocation = 'https://hypixel.net/proxy/aHR0cHM6Ly9pLmltZ3VyLmNvbS9JWGZYUmZxLmpwZw%3D%3D/image.pngg';

    fileTransfert.download(imageLocation, this.storageDirectory + 'image-download-test.png').then((entry) => {
      const alertSuccess = this.alertCtrl.create({
        title: `Download Succeeded!`,
        subTitle: `L'image à bien été téléchargée dans le path : ${entry.toURL()}`,
        buttons: ['Ok']
      });

      alertSuccess.present();

    }, (error) => {

      const alertFailure = this.alertCtrl.create({
        title: `Download Failed!`,
        subTitle: `was not successfully downloaded. Error code: ${error.code}`,
        buttons: ['Ok']
      });

      alertFailure.present();

    });
  }

  json() {
    this.file.checkFile(this.storageDirectory, 'xD.json')
      .then(doesExist => {
        console.log("doesExist : " + doesExist);
        return this.writeToAccessLogFile();
      }).catch(err => {
      return this.file.createFile(this.storageDirectory, 'xD.json', false)
        .then(FileEntry => this.writeToAccessLogFile())
        .catch(err => console.log('Couldn'));
    });
  }

  writeToAccessLogFile() {
    this.file.writeExistingFile(this.storageDirectory, 'xD.json', JSON.stringify(this.gay)).then((success) => {
      const alertSuccess = this.alertCtrl.create({
        title: `Download Succeeded!`,
        subTitle: `le fichier JSON à bien été téléchargé dans le path : ${success}`,
        buttons: ['Ok']
      });

      alertSuccess.present();
    });
  }
}
