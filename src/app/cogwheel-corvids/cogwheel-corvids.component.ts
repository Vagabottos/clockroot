import { Component, OnInit, Input } from '@angular/core';
import { CorvidBot } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-corvid',
  templateUrl: './cogwheel-corvids.component.html',
  styleUrls: ['./cogwheel-corvids.component.scss'],
})
export class CorvidComponent //implements OnInit
{

  @Input() public bot: CorvidBot;

  public buildings = [
    { suit: 'fox', building: 'sawmill' },
    { suit: 'bunny', building: 'workshop' },
    { suit: 'mouse', building: 'recruiter' }
  ];

  constructor(
    public botService: BotService,
    public translateService: TranslateService
  ) { }

  changeSuit(suit) {
    this.bot.customData.currentSuit = suit;
    this.botService.saveBots();
  }
  
//  ngOnInit() {
//    this.bot.customData.buildings = this.bot.customData.buildings || [];
//  }

}
