import { Injectable } from '@angular/core';

import { Bot, Difficulty, Rule } from './models/bot';

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

  public toggleRule(rule: Rule) {
    if (!rule.canToggle) { return; }

    rule.isActive = !rule.isActive;
  }

  public goToBot(botName: string) {
    window.location.href = `#${botName}`;
  }

  private loadBots() {
    const loadedBots = localStorage.getItem('bots') || '[]';
    this.bots = JSON.parse(loadedBots);
  }

  private saveBots() {
    localStorage.setItem('bots', JSON.stringify(this.bots));
  }
}
