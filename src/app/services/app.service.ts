/**
 * Serviços de uso geral
 *    Aqui estão alguns serviços usados em toda ou parte do aplicativo
 * @author Por Luferat
 */

import { Injectable } from '@angular/core';

// 3.1) Importa dependências
import { AlertController } from '@ionic/angular'; // Caixa de alerta

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(

    // 3.2) Injeção das dependências
    public alertController: AlertController // Caixa de alerta
  ) { }

  // 3.3) Caixa de alerta para feedback (https://ionicframework.com/docs/api/alert)
  async myAlert(header: string, message: string, handler: any) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [{
        text: 'Ok',
        handler: handler
      }]
    });
    await alert.present();
  }
}
