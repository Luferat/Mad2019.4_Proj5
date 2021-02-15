import { Component, OnInit } from '@angular/core';

// 1. Importa dependências
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AlertController } from '@ionic/angular';

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
    public alert: AlertController
  ) { }

  // 4. Inclua 'void' no 'OnInit'
  ngOnInit() {

    // 5. Cria formulário reativo
    this.contactFormCreate();

    // 9. Preenche os campos do formulário se usuário estiver logado
    if (this.contactForm) {
      this.auth.onAuthStateChanged((userData) => {
        this.contactForm.controls.name.setValue(userData.displayName.trim());
        this.contactForm.controls.email.setValue(userData.email.trim());
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
          Validators.minLength(3)
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      subject: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ],
      message: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
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
      this.contactConfirm();

      // Em caso de erro, gera log
    }).catch((error) => { console.error(error); });
  }

  // 8. Exibe feedback
  async contactConfirm() {
    const alert = await this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Contato Enviado',
      message: 'Seu contato foi enviado com sucesso!<br><br>Obrigado...',
      buttons: [{
        text: 'Ok',
        handler: () => {

          // Reinicia formulário
          this.contactForm.reset({
            name: this.contactForm.value.name.trim(),
            email: this.contactForm.value.email.trim(),
            subject: '',
            message: ''
          });
        }
      }]
    });
    await alert.present();
  }
}
