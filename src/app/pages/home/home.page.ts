import { Component, OnInit } from '@angular/core';

// 1) Importa dependências
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  // 3) Atributos do objeto
  private itemsCollection: AngularFirestoreCollection<any>;
  items: Observable<any[]>;

  constructor(

    // 2) Injeta dependências
    private afs: AngularFirestore
  ) {

    // 4) Conectando ao Firestore
    this.itemsCollection = afs.collection<any>('articles', ref => ref.where('status', '==', 'ativo').orderBy('date', 'desc'));
    this.items = this.itemsCollection.valueChanges({ idField: 'artId' });
  }

  ngOnInit() { }
}
