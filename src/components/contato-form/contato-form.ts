import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from '@angular/fire/database';
import { NavController, AlertController } from 'ionic-angular';



/**
 * Generated class for the ContatoFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'contato-form',
  templateUrl: 'contato-form.html'
})
export class ContatoFormComponent {

  contatoForm: FormGroup;

  constructor(
    public formbuilder: FormBuilder,
    public http: Http,
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
  ) {
    this.contatoForm = this.formbuilder.group({
      nome: [null, [Validators.required, Validators.minLength(5)]],
      idade: [null, [Validators.required]],
      sexo: [null, [Validators.required, Validators.minLength(5)]],
      posto: [null, [Validators.required, Validators.minLength(5)]],
      diagnostico: [null, [Validators.required, Validators.minLength(5)]],
      area: [null, [Validators.required, Validators.minLength(5)]],
      estadocivil: [null, [Validators.required, Validators.minLength(5)]],
      quemmora: [null, [Validators.required]],
      qtdpessoas: [null, [Validators.required]],
      moradia: [null, [Validators.required]],
      saneamento: [null, [Validators.required]],
      escolaridade: [null, [Validators.required, Validators.minLength(5)]],
      situacaoprofissional: [null, [Validators.required, Validators.minLength(5)]],
      historiapatologica: [null, [Validators.required]],

    })
  }


  cadastraContato() {
    this.db.database.ref('/paciente').push(this.contatoForm.value)
      .then(() => {

        this.navCtrl.setRoot('start-page');
        this.presentAlert('', 'Dados inseridos com sucesso!');
        console.log('Salvou');
        this.contatoForm.reset();
      })
  }

  presentAlert(title: string, subtitle: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }
}
