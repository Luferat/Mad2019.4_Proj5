import { Component, OnInit } from '@angular/core';

// 1. Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(

    // 2. Injeta dependências
    public auth: AngularFireAuth,
    private router: Router,
  ) { }

  ngOnInit() { }

  // 3. Método de logout
  logout() {
    this.auth.signOut()
      .then(
        () => {
          this.router.navigate(['/home']);
        }
      )
      .catch(
        (error) => {
          console.error(error);
        }
      );
  }
}
