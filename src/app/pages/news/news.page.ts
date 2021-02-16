import { Component, OnInit } from '@angular/core';

// 1. Importa dependências
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  // 3. Cria atributos

  //// API Key do serviço, obtida em 'https://newsapi.org/account'
  apiKey = '49d8fbd866b1481ab68445ce872a17b4';

  //// Assunto 'base' da busca
  apiQuery = 'programação';

  //// Total de notícias retornadas. O máximo é 20 no plano free.
  apiItems = 10;

  //// URL da API. Não altere!
  apiURL = `http://newsapi.org/v2/everything?apiKey=${this.apiKey}&language=pt&source=google-news&q=${this.apiQuery}}`;

  //// View das notícias obtidas
  newsList: any;

  constructor(

    // 2. Injeta dependências
    private http: HttpClient // Cria objeto tipo 'HttpClient'
  ) { }

  ngOnInit() {

    // 4. Obtém dados da API REST (JSON) usando HTTP
    this.http.get(this.apiURL).subscribe(
      (data: any) => {

        // 5. Atribui à view de notícias, obtendo somente a quantidade solicitada
        this.newsList = data.articles.slice(0, this.apiItems);
      });
  }

  // 7. Abre site com notícia completa
  readNews(link: any) {
    window.open(link);
    return false;
  }
}
