import { Component, OnInit } from '@angular/core';

// 1. Importa dependências 
import { AngularFireAuth } from '@angular/fire/auth'; // Autenticação
import firebase from 'firebase/app';
import { Router } from '@angular/router'; // Roteamento
import { AlertController } from '@ionic/angular'; // Caixa de alerta

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(

    // 2. Injeta dependências
    public auth: AngularFireAuth, // Autenticação
    public router: Router, // Roteamento
    public alertController: AlertController // Caixa de alerta    
  ) { }

  ngOnInit() { }

  // 4. Ação do botão de login
  async login() {

    // Login com popup usando o Google
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())

      // Se logou
      .then((data) => {

        // Exibe feedback
        this.myAlert(
          `Olá ${data.user.displayName}`,
          `Você já pode acessar todos os recursos do aplicativo.`
        );
      })

      // Se falhou, olhe para o console
      .catch((error) => { console.log(error); });
  }

  // 3. Caixa de alerta para feedback
  // Documentação: https://ionicframework.com/docs/api/alert
  async myAlert(title: string, text: string) {
    const alert = await this.alertController.create({
      header: title,
      message: text,
      buttons: [{
        text: 'Ok',
        handler: () => {

          // Vai para a raiz
          this.router.navigate(['/']);
        }
      }]
    });
    await alert.present();
  }
}
