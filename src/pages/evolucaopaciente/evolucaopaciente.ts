import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

/**
 * Generated class for the EvolucaopacientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'evolucao-page'
})
@Component({
  selector: 'page-evolucaopaciente',
  templateUrl: 'evolucaopaciente.html',
})
export class EvolucaopacientePage {
  pacientesDb;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
  ) {
    this.pacientesDb = [];
  }

  ionViewDidLoad() {
    this.pegarDadosFirebase();
  }

  pegarDadosFirebase() {
    this.http.get('https://fir-login-8f2fd.firebaseio.com/paciente.json')
      .map(res => res.json())
      .subscribe(data => {
        if (data !== null && data !== undefined) {
          this.trataDados(data);
          console.log(data, 'dados do firebase');
        }
      })
  }
  trataDados(dados) {
    this.pacientesDb = Object.keys(dados).map(i => dados[i]);
  }

}
