import { Component, OnInit, Input } from '@angular/core';
import { DuchyBot } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-duchy',
  templateUrl: './drillbit-duchy.component.html',
  styleUrls: ['./drillbit-duchy.component.scss'],
})
export class DuchyComponent implements OnInit {

  @Input() public bot: DuchyBot;

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
