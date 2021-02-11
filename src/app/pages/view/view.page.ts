import { Component, OnInit } from '@angular/core';

// 1. Importa dependências
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit {

  // 3. Atributos do objeto
  item: Observable<any>; // Dados do artigo

  constructor(

    // 2. Injeta dependências
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) { }

  ngOnInit() {

    // 4. Obtém Id do artigo da rota (endereço da página)
    this.route.params.subscribe(
      (data) => {
        if (data.id) {

          // 5. Obtém o documento do banco de dados
          this.item = this.afs.doc<any>(`articles/${data.id}`).valueChanges();
        }
      }
    );
  }
}
