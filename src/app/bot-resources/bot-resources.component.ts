import { Component, OnInit, Input } from '@angular/core';
import { Bot, Item } from '../models/bot';
import { BotService } from '../bot.service';

@Component({
  selector: 'app-bot-resources',
  templateUrl: './bot-resources.component.html',
  styleUrls: ['./bot-resources.component.scss'],
})
export class BotResourcesComponent implements OnInit {

  @Input() public bot: Bot;

  public itemOrder: Item[] = [
    'Sack', 'Sack2', 'Boot', 'Boot2', 'Sword', 'Sword2',
    'Tea', 'Tea2', 'Coin', 'Coin2', 'Crossbow', 'Hammer'
  ];

  public itemImages: { [key in Item]: string } = {
    Sack: 'sack',
    Sack2: 'sack',
    Boot: 'boot',
    Boot2: 'boot',
    Sword: 'sword',
    Sword2: 'sword',
    Tea: 'tea',
    Tea2: 'tea',
    Coin: 'coin',
    Coin2: 'coin',
    Crossbow: 'crossbow',
    Hammer: 'hammer',
    Torch: 'torch'
  };

  constructor(private botService: BotService) { }

  ngOnInit() {}

  setVP($event) {
    this.botService.setVP(this.bot, $event.detail.value);
  }

  toggleItem(item) {
    this.botService.toggleItem(this.bot, item);
  }

}
