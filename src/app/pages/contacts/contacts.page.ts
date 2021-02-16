import { Component, OnInit } from '@angular/core';

// 1. Importa dependências
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

// 10. Não permite preencher campos somente com espaços
import { AbstractControl } from '@angular/forms';
import { AppService } from '../../services/app.service';
export function removeSpaces(control: AbstractControl) {
  if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  // 3. Atributos
  contactForm: FormGroup;
  pipe = new DatePipe('en_US');

  constructor(

    // 2. Injeta dependências
    public form: FormBuilder,
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public alert: AlertController,
    private app: AppService
  ) { }

  // 4. Inclua 'void' no 'OnInit'
  ngOnInit() {

    // 5. Cria formulário reativo
    this.contactFormCreate();

    // 9. Preenche os campos do formulário se usuário estiver logado
    if (this.contactForm) {
      this.auth.onAuthStateChanged((userData) => {
        if (userData) {
          this.contactForm.controls.name.setValue(userData.displayName.trim());
          this.contactForm.controls.email.setValue(userData.email.trim());
        }
      });
    }
  }

  // 6. Cria formulário reativo
  contactFormCreate() {
    this.contactForm = this.form.group({
      date: [''],
      name: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          removeSpaces
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email,
          removeSpaces
        ])
      ],
      subject: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          removeSpaces
        ])
      ],
      message: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          removeSpaces
        ])
      ]
    });
  }

  // 7. Processa envio do contato
  contactSend() {

    // Formata documento
    this.contactForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd hh:mm:ss').trim()
    );

    // Salva documento no Firestore
    this.afs.collection('contacts').add(this.contactForm.value).then(() => {

      // Exibe feedback
      this.app.myAlert(
        'Contato Enviado',
        'Seu contato foi enviado com sucesso!<br><br>Obrigado...',
        () => {

          // Reinicia formulário
          this.contactForm.reset({
            name: this.contactForm.value.name.trim(),
            email: this.contactForm.value.email.trim(),
            subject: '',
            message: ''
          });
        }
      );

      // Em caso de erro, gera log
    }).catch((error) => { console.error(error); });
  }
}
