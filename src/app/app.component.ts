import { Component, OnInit } from '@angular/core';

// 1. Importa dependências
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  private splash = true;

  constructor(

    // 2. Injeta dependências
    private auth: AngularFireAuth,
  ) { }

  ngOnInit() {

    const timer = setTimeout(() => { this.splash = false; }, 2000);
  }
}
