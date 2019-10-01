import { EvolucaopacientePage } from './../evolucaopaciente/evolucaopaciente';
import { AngularFireDatabase } from '@angular/fire/database';
import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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

  contatosDb;
  uid: String;
  aux: any;
  list;
  auxlist;


  constructor(
    public afAuth: AngularFireAuth,
    public http: Http,
    public db: AngularFireDatabase,
    public navCtrl: NavController,


  ) {
    this.getList();
    this.uid = this.afAuth.auth.currentUser.uid;
    this.auxlist = this.afAuth.auth.currentUser.uid;
    console.log(this.uid);

    if (this.uid == "Qs4UFlutmOfgzrSSo2M9RxFIaBv2") {

      this.aux = "Qs4UFlutmOfgzrSSo2M9RxFIaBv2";
      console.log("ADM chegou compadi");
    } else {
      console.log("De boa chefia, é parça chegando");
    }

  }
  getList() {
    let listDB = this.db.database.ref('/paciente');
    listDB.once('value', (snapshot) => {
      const items = snapshot.val();
      if (items) {
        this.list = Object.keys(items).map(i => items[i]);
      }
    })
  }
  openEvolution(nome: string) {
    this.navCtrl.push(EvolucaopacientePage, {
      pacients: nome
    });
  }
}
