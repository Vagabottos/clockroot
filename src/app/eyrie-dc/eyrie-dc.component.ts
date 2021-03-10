import { Component, OnInit, Input } from '@angular/core';
import { EyrieBotDC } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-eyrie-dc',
  templateUrl: './eyrie-dc.component.html',
  styleUrls: ['./eyrie-dc.component.scss'],
})
export class EyrieDCComponent implements OnInit {

  @Input() public bot: EyrieBotDC;

  constructor(
    public botService: BotService,
    public translateService: TranslateService
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
