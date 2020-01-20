import { Injectable } from '@angular/core';

import { Bot, Difficulty, Rule, Item } from './models/bot';

@Injectable({
  providedIn: 'root'
})
export class BotService {
  public bots: Bot[] = [];

  public botMeta = {
    Marquise: {
      icon: 'marquise',
      fullName: 'Mechanical Marquise'
    }
  };

  constructor() {
    this.loadBots();
  }

  public addBot(bot: Bot) {
    if (this.bots.some(x => x.name === bot.name)) { return; }

    this.bots.push(bot);
    this.saveBots();
  }

  public removeBot(bot: Bot) {
    this.bots = this.bots.filter(x => x !== bot);
    this.saveBots();
  }

  public clearBots() {
    this.bots = [];
    this.saveBots();
  }

  public toggleSetup(bot: Bot) {
    bot.setupHidden = !bot.setupHidden;
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
  }
}
