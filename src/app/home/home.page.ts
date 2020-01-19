import { Component } from '@angular/core';

import { MarquiseBot } from '../models/bot';
import { AlertController, PopoverController } from '@ionic/angular';
import { FactionMenuComponent } from '../faction-menu/faction-menu.component';
import { BotService } from '../bot.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private botHash = {
    Marquise: MarquiseBot
  };

  constructor(
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,

    private botService: BotService
  ) {}

  public async addBot(ev) {
    const popover = await this.popoverCtrl.create({
      component: FactionMenuComponent,
      event: ev,
      translucent: true
    });

    popover.onDidDismiss().then((res) => {
      if (!res || !res.data) { return; }

      this.botService.addBot(new this.botHash[res.data]());
    });

    return await popover.present();
  }

  public async reset() {
    const alert = await this.alertCtrl.create({
      header: 'Reset Your Bots?',
      message: 'This will reset all rules, victory points, traits, and any other settings you have set.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes, reset!',
          handler: () => {
            this.botService.clearBots();
          }
        }
      ]
    });

    await alert.present();
  }

}
