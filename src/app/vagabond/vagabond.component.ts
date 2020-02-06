import { Component, OnInit, Input } from '@angular/core';
import { VagaBot } from '../models/vagabond';
import { BotService } from '../bot.service';
import { RendererService } from '../renderer.service';

@Component({
  selector: 'app-vagabond',
  templateUrl: './vagabond.component.html',
  styleUrls: ['./vagabond.component.scss'],
})
export class VagabondComponent implements OnInit {

  @Input() public bot: VagaBot;

  public get descriptions() {
    return this.bot.descriptions;
  }

  public get battleTrackBonus(): string {
    const total = Object.values(this.bot.customData.satchelItems)
      .filter(x => x === 3)
      .length;

    switch (total) {
      case 0: return 'Maximum rolled hits: 1';
      case 1: return 'Maximum rolled hits: 2';
      case 2: return 'Maximum rolled hits: 3';
      case 3: return 'Maximum rolled hits: 3; as attacker, deal 1 extra hit.';
      default: return 'You have too many, or not enough battle track items.';
    }
  }

  constructor(
    public botService: BotService,
    public rendererService: RendererService
  ) { }

  ngOnInit() {
  }

  changeVaga(newVaga) {
    this.bot.customData.chosenVaga = newVaga;
    this.botService.saveBots();
  }

  toggleSatchelItem(item) {
    this.bot.customData.satchelItems[item]++;
    if (this.bot.customData.satchelItems[item] >= 4) {
      this.bot.customData.satchelItems[item] = 0;
    }

    this.botService.saveBots();
  }

  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }

}
