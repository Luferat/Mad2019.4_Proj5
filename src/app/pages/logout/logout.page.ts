import { Component, OnInit } from '@angular/core';

// 1. Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router'; // Roteamento

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(

    // 2. Injeta dependências
    public auth: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit() { }

  // 3. Ação do botão de logout
  logout() {
    this.auth.signOut()
      .then(
        () => {

          // Vai para a raiz
          this.router.navigate(['/']);
        }
      );
  }

}
