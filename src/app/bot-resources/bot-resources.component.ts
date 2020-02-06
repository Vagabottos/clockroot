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
  @Input() public isVaga: boolean;

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

  public get itemOrder(): Item[] {
    return this.isVaga ? this.vagaItemOrder : this.defaultItemOrder;
  }

  public defaultItemOrder: Item[] = [
    'Sack', 'Sack2', 'Boot', 'Boot2', 'Sword', 'Sword2',
    'Tea', 'Tea2', 'Coin', 'Coin2', 'Crossbow', 'Hammer'
  ];

  public vagaItemOrder: Item[] = Object.keys(this.itemImages) as Item[];

  constructor(private botService: BotService) { }

  ngOnInit() {}

  setVP($event) {
    this.botService.setVP(this.bot, $event.detail.value);
  }

  toggleItem(item) {
    this.botService.toggleItem(this.bot, item);
  }

}
