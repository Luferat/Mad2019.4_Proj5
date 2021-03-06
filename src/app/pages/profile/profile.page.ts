import { Component, OnInit } from '@angular/core';

// 1. Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(

    // 2. Injeta dependências
    public auth: AngularFireAuth
  ) { }

  ngOnInit() {}

  // 3. Vai para perfil do Google
  profile() {
    window.open('https://myaccount.google.com/');
    return false;
  }
}
