import { Component, OnInit, Input } from '@angular/core';
import { MarquiseBot } from '../models/bot';
import { RendererService } from '../renderer.service';
import { BotService } from '../bot.service';

@Component({
  selector: 'app-marquise',
  templateUrl: './marquise.component.html',
  styleUrls: ['./marquise.component.scss'],
})
export class MarquiseComponent implements OnInit {

  @Input() public bot: MarquiseBot;

  constructor(
    public botService: BotService,
    public rendererService: RendererService
  ) { }

  ngOnInit() {}

}
