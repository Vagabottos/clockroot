import { Component, OnInit, Input } from '@angular/core';
import { EyrieBot } from '../models';
import { BotService } from '../bot.service';
import { RendererService } from '../renderer.service';

@Component({
  selector: 'app-eyrie',
  templateUrl: './eyrie.component.html',
  styleUrls: ['./eyrie.component.scss'],
})
export class EyrieComponent implements OnInit {

  @Input() public bot: EyrieBot;

  constructor(
    public botService: BotService,
    public rendererService: RendererService
  ) { }

  ngOnInit() {
    this.bot.customData.buildings = this.bot.customData.buildings || [];
  }

  modifySuitCard(suit, diff = 1) {
    this.bot.customData.decree[suit] = Math.max(this.bot.customData.decree[suit] + diff, 0);

    this.botService.saveBots();
  }

  toggleBuilding(index) {
    this.bot.customData.buildings[index] = !this.bot.customData.buildings[index];

    this.botService.saveBots();
  }

}
