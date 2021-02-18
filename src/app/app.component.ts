import { Component, OnInit } from '@angular/core';

// 1. Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';

// DICA 2.1)
import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

// DICA 2.2)
export class AppComponent implements OnInit {

  private splash = true;

  constructor(

    // 2. Injeta dependências
    private auth: AngularFireAuth
  ) { }

  // DICA 2.3)
  ngOnInit() {
    SplashScreen.hide();
    const timer = setTimeout(() => { this.splash = false; }, 2000);
  }
}
