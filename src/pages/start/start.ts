import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';


/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'start-page'
})
@Component({
  selector: 'page-start',
  templateUrl: 'start.html'
})
export class StartPage {


  uid: String;
  aux: any;

  constructor(
    public afAuth: AngularFireAuth,

  ) {

    this.uid = this.afAuth.auth.currentUser.uid;
    console.log(this.uid);

    if (this.uid == "FnMEdC4WT5SpfIVepXsjgA4Nh3g1") {

      this.aux = "FnMEdC4WT5SpfIVepXsjgA4Nh3g1";
      console.log("ADM chegou compadi");
    } else {
      console.log("De boa chefia, é parça chegando");
    }

  }

}

