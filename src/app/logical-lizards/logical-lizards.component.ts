import { Component, OnInit, Input } from '@angular/core';
import { LizardBot } from '../models';
import { BotService } from '../bot.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-lizard',
  templateUrl: './logical-lizards.component.html',
  styleUrls: ['./logical-lizards.component.scss'],
})
export class LizardComponent implements OnInit {

  @Input() public bot: LizardBot;

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
