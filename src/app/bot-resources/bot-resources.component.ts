import { Component, Input, inject } from '@angular/core';
import { Bot, Item } from '../models/bot';
import { BotService } from '../bot.service';
import { IonicModule } from '@ionic/angular';
import { NgClass } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-bot-resources',
  templateUrl: './bot-resources.component.html',
  styleUrls: ['./bot-resources.component.scss'],
  imports: [IonicModule, NgClass, TranslatePipe],
})
export class BotResourcesComponent {
  private botService = inject(BotService);

  @Input() public bot!: Bot;
  @Input() public isVaga = false;

  public get itemImages() {
    return this.botService.itemImages;
  }

  public get itemOrder(): Item[] {
    return this.isVaga ? this.vagaItemOrder : this.defaultItemOrder;
  }

  public defaultItemOrder: Item[] = [
    'Sack',
    'Sack2',
    'Boot',
    'Boot2',
    'Sword',
    'Sword2',
    'Tea',
    'Tea2',
    'Coin',
    'Coin2',
    'Crossbow',
    'Hammer',
  ];

  public vagaItemOrder: Item[] = Object.keys(this.itemImages) as Item[];

  setVP(
    $event: CustomEvent<{
      value: number | { lower: number; upper: number } | undefined;
    }>,
  ) {
    if (typeof $event.detail.value !== 'number') {
      return;
    }
    this.botService.setVP(this.bot, $event.detail.value);
  }

  toggleItem(item: Item) {
    this.botService.toggleItem(this.bot, item);
  }
}
