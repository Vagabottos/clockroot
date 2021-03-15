import { Component, OnInit, Input } from '@angular/core';
import { WoodlandBotDC } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-woodland-dc',
  templateUrl: './woodland-dc.component.html',
  styleUrls: ['./woodland-dc.component.scss'],
})
export class WoodlandDCComponent implements OnInit {

  @Input() public bot: WoodlandBotDC;

  public sympathyScores = [0, 1, 1, 1, 1, 2, 2, 3, 3, 4];

  constructor(
    public botService: BotService,
    public translateService: TranslateService
  ) { }

  ngOnInit() {
  }

  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }

  toggleSympathy(pos) {
    this.bot.customData.sympathy[pos] = !this.bot.customData.sympathy[pos];
    this.botService.saveBots();
  }

  toggleBuilding(suit) {
    this.bot.customData.buildings[suit] = !this.bot.customData.buildings[suit];
    this.botService.saveBots();
  }

}
