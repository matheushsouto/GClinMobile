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
      area: [null, [Validators.required]],
      estadocivil: [null, [Validators.required]],
      quemmora: [null, [Validators.required]],
      qtdpessoas: [null, [Validators.required]],
      moradia: [null, [Validators.required]],
      agua: [],
      luz: [],
      esgoto: [],
      pavimento: [],
      lixo: [],
      escolaridade: [null, [Validators.required, Validators.minLength(5)]],
      situacaoprofissional: [null, [Validators.required, Validators.minLength(5)]],
      beneficio: [null, [Validators.required]],
      historiapatologica: [null, [Validators.required]],
      alcool: [],
      cigarro: [],
      medicamentos: [null, [Validators.required, Validators.minLength(5)]],
      sugestaoencaminhamento: [null, [Validators.required]],
      motivoencaminhamento: [null, [Validators.required, Validators.minLength(5)]],


    })
  }


  cadastraContato() {
    this.db.database.ref('/paciente').push(this.contatoForm.value)
      .then(() => {

        this.navCtrl.setRoot('start-page');
        this.presentAlert('', 'Dados inseridos com sucesso!');
        console.log(this.contatoForm);
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
