import { NgModule } from '@angular/core';
import { ContatoFormComponent } from './contato-form/contato-form';
import { IonicModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [ContatoFormComponent],
  imports: [
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [ContatoFormComponent]
})
export class ComponentsModule { }
