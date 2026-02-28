import { Injectable } from '@angular/core';

import { Bot, Difficulty, Rule, Item, BotName } from './models/bot';
import { MarquiseBot, EyrieBot, MarquiseBotDC, EyrieBotDC, WoodlandBotDC, VagaBotDC, WoodlandBot, VagaBot, DuchyBot, LizardBot, CorvidBot, RiverfolkBot, LegionBot } from './models';
import { AlertController, ModalController } from '@ionic/angular';
import { PriorityModalComponent } from './priority-modal/priority-modal.component';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  public botHash: { [key in BotName]: any } = {
    Marquise: MarquiseBot,
    Eyrie: EyrieBot,
    Woodland: WoodlandBot,
    Vagabond: VagaBot,
    MarquiseDC: MarquiseBotDC,
    EyrieDC: EyrieBotDC,
    WoodlandDC: WoodlandBotDC,
    VagabondDC: VagaBotDC,
    Duchy: DuchyBot,
    Lizard: LizardBot,
    Corvid: CorvidBot,
    Riverfolk: RiverfolkBot,
    Legion: LegionBot
  };

  public bots: Bot[] = [];

  public botMeta: { [key in BotName]: { icon: string, fullName: string } } = {
    Marquise: {
      icon: 'marquise',
      fullName: 'Mechanical Marquise'
    },
    Eyrie: {
      icon: 'eyrie',
      fullName: 'Electric Eyrie'
    },
    Woodland: {
      icon: 'woodland',
      fullName: 'Automated Alliance'
    },
    Vagabond: {
      icon: 'vagabond',
      fullName: 'Vagabot'
    },
    MarquiseDC: {
      icon: 'marquise',
      fullName: 'Mechanical Marquise (DC)'
    },
    EyrieDC: {
      icon: 'eyrie',
      fullName: 'Electric Eyrie (DC)'
    },
    WoodlandDC: {
      icon: 'woodland',
      fullName: 'Automated Alliance (DC)'
    },
    VagabondDC: {
      icon: 'vagabond',
      fullName: 'Vagabot (DC)'
    },
    Duchy: {
      icon: 'duchy',
      fullName: 'Drillbit Duchy'
    },
    Lizard: {
      icon: 'lizard',
      fullName: 'Logical Lizards'
    },
    Corvid: {
      icon: 'corvid',
      fullName: 'Cogwheel Corvids'
    },
    Riverfolk: {
      icon: 'riverfolk',
      fullName: 'Riverfolk Robots'
    },
    Legion: {
      icon: 'legion',
      fullName: 'Looting Legion'
    }
  };

  public itemImages: { [key in Item]: string } = {
    Sack: 'sack',
    Sack2: 'sack',
    Sack3: 'sack',
    Sack4: 'sack',
    Boot: 'boot',
    Boot2: 'boot',
    Boot3: 'boot',
    Boot4: 'boot',
    Boot5: 'boot',
    Boot6: 'boot',
    Boot7: 'boot',
    Sword: 'sword',
    Sword2: 'sword',
    Sword3: 'sword',
    Sword4: 'sword',
    Sword5: 'sword',
    Sword6: 'sword',
    Sword7: 'sword',
    Tea: 'tea',
    Tea2: 'tea',
    Tea3: 'tea',
    Coin: 'coin',
    Coin2: 'coin',
    Coin3: 'coin',
    Crossbow: 'crossbow',
    Crossbow2: 'crossbow',
    Crossbow3: 'crossbow',
    Hammer: 'hammer',
    Hammer2: 'hammer',
    Hammer3: 'hammer',
    Hammer4: 'hammer',
    Torch: 'torch',
    Torch2: 'torch',
    Torch3: 'torch'
  };

  constructor(private modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.loadBots();
  }

  public addBot(bot: Bot) {
    if (this.bots.some(x => x.name === bot.name)) { return; }

    this.bots.push(bot);
    this.saveBots();
  }

  public  async removeBot(bot: Bot) {
    const alert = await this.alertCtrl.create({
      header: `Remove the ${bot.name} bot?`,
      message: 'This will remove all rules, victory points, traits, and any other settings you have set for this bot.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Yes, remove!',
          handler: () => {
            this.bots = this.bots.filter(x => x !== bot);
            this.saveBots();
          }
        }
      ]
    });

    await alert.present();
  }

  public clearBots() {
    this.bots = [];
    this.saveBots();
  }

  private generateTraitHash(bot: Bot) {
    bot.traitHash = bot.rules.reduce((prev, cur) => {
      prev[cur.traitName] = cur.isActive;
      return prev;
    }, {});
  }

  public toggleSetup(bot: Bot) {
    bot.setupHidden = !bot.setupHidden;
    if (bot.setupHidden) {
      this.generateTraitHash(bot);
      bot.setup();
    }

    this.saveBots();
  }

  public changeDifficulty(bot: Bot, difficulty: Difficulty) {
    bot.difficulty = difficulty;
    this.saveBots();
  }

  public setVP(bot: Bot, vp: number) {
    bot.vp = vp;
    this.saveBots();
  }

  public toggleItem(bot: Bot, item: Item) {
    bot.items[item] = !bot.items[item];

    // exceptionssss
    if (bot.items[item] && bot.name === 'Vagabond') {
      (bot as VagaBot).customData.satchelItems[item] = 0;
    }

    if (bot.items[item] && bot.name === 'VagabondDC') {
      (bot as VagaBotDC).customData.satchelItems[item] = 0;
    }

    this.saveBots();
  }

  public toggleRule(rule: Rule) {
    if (!rule.canToggle) { return; }

    // update the view immediately
    setTimeout(() => {
      rule.isActive = !rule.isActive;
      this.saveBots();
    }, 0);
  }

  public goToBot(botName: string) {
    window.location.href = `#${botName}`;
  }

  public saveBots() {
    localStorage.setItem('bots', JSON.stringify(this.bots));
  }

  private loadBots() {
    const loadedBots = localStorage.getItem('bots') || '[]';
    this.bots = JSON.parse(loadedBots);
    this.bots = this.bots.map(bot => {
      const botRef = new this.botHash[bot.name]();

      botRef.difficulty = bot.difficulty;
      botRef.setupHidden = bot.setupHidden;
      botRef.vp = bot.vp;
      botRef.items = bot.items;
      botRef.traitHash = botRef.traitHash || {};
      botRef.customData = bot.customData || botRef.customData;

      for (let i = 0; i < botRef.rules.length; i++) {
        if (!bot.rules[i]) { continue; }

        botRef.rules[i].isActive = bot.rules[i].isActive;
      }

      this.generateTraitHash(botRef);

      return botRef;
    });
  }

  public async showPriorities() {
    const modal = await this.modalCtrl.create({
      component: PriorityModalComponent
    });

    return await modal.present();
  }
}
