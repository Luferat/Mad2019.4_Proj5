import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

// 1. Importa dependências
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';
import { AppService } from '../../services/app.service';

// 6. Não permite somente espaços nos campos
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
  public contactForm: FormGroup; // Cria formulário
  pipe = new DatePipe('en_US'); // Formatador de datas

  constructor(

    // 2. Injeta dependências
    public form: FormBuilder,
    public afs: AngularFirestore,
    public auth: AngularFireAuth,
    public app: AppService
  ) { }

  ngOnInit() {

    // 4. Cria o formulário de contatos
    this.contactFormCreate();

    // 8.  Preenche os campos se usuário está logado
    if (this.contactForm) {
      this.auth.onAuthStateChanged(
        (userData) => {
          if(userData) {
            this.contactForm.controls.name.setValue(userData.displayName.trim());
            this.contactForm.controls.email.setValue(userData.email.trim());
          }
        }
      );
    }
  }

  // 5. Cria o formulário de contatos
  contactFormCreate() {

    this.contactForm = this.form.group({
      date: [''],
      name: [
        '',
        Validators.compose([
          Validators.required, // Obrigatório
          Validators.minLength(3), // Pelo menos 3 caracteres
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

  // 7. Envia o formulário
  contactSend() {

    // Formata data
    this.contactForm.controls.date.setValue(
      this.pipe.transform(Date.now(), 'yyyy-MM-dd HH:mm:ss').trim()
    );

    // Salva documento no Firestore
    this.afs.collection('contacts').add(this.contactForm.value)
      .then(
        () => {

          // Exibe o feedback
          this.app.myAlert(
            'Contato Enviado',
            'Seu contato foi enviado com sucesso!<br><br>Obrigado...',
            () => {

              // Reiniciar o formulário
              this.contactForm.reset({
                date: '',
                name: this.contactForm.value.name.trim(),
                email: this.contactForm.value.email.trim(),
                subject: '',
                message: ''
              });
            }
          );
        }
      )
      .catch(
        (error) => { console.error(error); }
      );
  }
}
