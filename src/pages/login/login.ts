import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'login'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  email: AbstractControl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formbuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public storage: Storage
  ) {
    this.loginForm = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
    this.email = this.loginForm.controls["email"];
  }

  submitLogin() {
    this.afAuth.auth
      .signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
      .then((response) => {
        //UID no nó
        this.storage.set('user', response.user.uid)
          .then(() => {
            this.navCtrl.setRoot('start-page');
          })
        this.navCtrl.setRoot('start-page');
      })
      .catch(error => {
        if (error.code == 'auth/wrong-password') {
          this.presentAlert('', 'Senha incorreta, digite novamente.');
          this.loginForm.controls['password'].setValue(null);
        }
        if (error.code == 'auth/user-not-found') {
          this.presentAlert('', 'Não é possível encontrar a conta');
          this.loginForm.controls['email'].setValue(null);
          this.loginForm.controls['password'].setValue(null);
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
