import { Component, OnInit } from '@angular/core';

// 1. Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

// 3.1) Importa serviços de uso geral
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(

    // 2. Injeta dependências
    public auth: AngularFireAuth,
    private router: Router,

    // 3.2) Injeta serviços de uso geral
    private app: AppService
  ) { }

  ngOnInit() { }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (data) => {

          // 3.3) Exibe feedback usando service 'app.myAlert'
          this.app.myAlert(
            `Olá ${data.user.displayName}!`,
            'Você já pode acessar todos os recursos do aplicativo.',
            () => { this.router.navigate(['/home']); }
          );
        }
      )
      .catch((error) => { console.log(error) });
  }
}
