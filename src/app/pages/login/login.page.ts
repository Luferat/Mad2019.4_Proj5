import { Component, OnInit } from '@angular/core';

// 1. Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(

    // 2. Injeta dependências
    public auth: AngularFireAuth,
    private alertCtrl: AlertController,
    private router: Router,
  ) { }

  ngOnInit() { }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (data) => {

          // Exibe feedback
          this.myAlert(
            `Olá ${data.user.displayName}!`,
            'Você já pode acessar todos os recursos do aplicativo.'
          );
        }
      )
      .catch((error) => { console.log(error) });
  }

  // Método que exibe popup
  async myAlert(title: string, text: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: text,
      buttons: [{
        text: 'Ok',
        handler: () => {

          // Vai para a 'home'
          this.router.navigate(['/home']);
        }
      }]
    });
    alert.present();
  }
}

