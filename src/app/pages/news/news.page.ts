import { Component, OnInit } from '@angular/core';

// 1. Importa dependências
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  // 3. Atributos
  private apiKey = 'f6b1d5dc3f4c47c483446e353984603f'; // Obtenha de 'newsapi.org'
  private apiQuery = 'programação'; // Notícias sobre...
  private apiItens = 10; // Exibir ... notícias (máximo 20)
  public apiURL = `https://newsapi.org/v2/everything?apiKey=${this.apiKey}&source=google-news-br&language=pt&q=${this.apiQuery}`;
  private newsList: any; // Armazena as notícias recebidas

  constructor(

    // 2. Injeta dependências
    private http: HttpClient
  ) { }

  ngOnInit() {

    // 4. Obtendo as notícias da API REST (JSON) usando HTTP
    this.http.get(this.apiURL).subscribe(
      (data) => {

        // 5. Atribui à view de notícias
        this.newsList = data.articles.slice(0, this.apiItens);
      }
    );
  }

  readNews(link: any) {
    window.open(link);
    return false;
  }
}
