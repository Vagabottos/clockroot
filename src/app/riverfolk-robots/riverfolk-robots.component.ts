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

  public buildings = [
    { suit: 'fox', building: 'sawmill' },
    { suit: 'bunny', building: 'workshop' },
    { suit: 'mouse', building: 'recruiter' }
  ];

  constructor(
    public botService: BotService,
    public translateService: TranslateService
  ) { }
  
  ngOnInit() {
    this.bot.customData.buildings = this.bot.customData.buildings || [];
  }

}
