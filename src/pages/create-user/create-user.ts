import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidateConfirmPassword } from '../../validators/confirmPassword';

import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the CreateUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'create-user'
})
@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html'
})
export class CreateUserPage {
  registerForm: FormGroup;
  uid: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    public alertCtrl: AlertController,
    public afAuth: AngularFireAuth

  ) {

    this.registerForm = this.formbuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        null,
        [Validators.required, Validators.minLength(6), ValidateConfirmPassword]
      ]
    });
  }
  submitForm() {
    this.afAuth.auth
      .createUserWithEmailAndPassword(
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .then(response => {
        this.presentAlert('Usuario Cadastrado', 'Usuario Cadastrado com Sucesso');
        this.registerForm.controls['name'].setValue(null);
        this.registerForm.controls['email'].setValue(null);
        this.registerForm.controls['password'].setValue(null);
        this.registerForm.controls['confirmPassword'].setValue(null);
      })
      .catch(error => {
        if (error.code == 'auth/email-already-in-use') {
          this.presentAlert('ERRO', 'O email já está sendo utilizado!');
          this.registerForm.controls['name'].setValue(null);
          this.registerForm.controls['email'].setValue(null);
          this.registerForm.controls['password'].setValue(null);
          this.registerForm.controls['confirmPassword'].setValue(null);
        }
        if (error.code == 'auth/invalid-email') {
          this.presentAlert('Erro', 'Seu email é invalido');
          this.registerForm.controls['name'].setValue(null),
          this.registerForm.controls['email'].setValue(null),
          this.registerForm.controls['password'].setValue(null),
          this.registerForm.controls['confirmPassword'].setValue(null);
        }
        if (error.code == 'auth/operation-not-allowed') {
          this.presentAlert('Erro', 'Operação Cancelada, tente novamente');
        }
      });
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
