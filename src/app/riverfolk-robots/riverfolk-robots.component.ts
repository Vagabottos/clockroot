import { Component, OnInit, Input } from '@angular/core';
import { RiverfolkBot } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-riverfolk',
  templateUrl: './riverfolk-robots.component.html',
  styleUrls: ['./riverfolk-robots.component.scss'],
})
export class RiverfolkComponent implements OnInit {

  @Input() public bot: RiverfolkBot;

  constructor(
    public botService: BotService,
    public translateService: TranslateService
  ) { }
  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }
  ngOnInit() {
  }

}
