import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { BotService } from './bot.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {

  public language: string;

  constructor(
    private translateService: TranslateService,
    public botService: BotService
  ) {
  }

  ngOnInit() {
    const validLanguages = ['en-US', 'fr-FR'];
    this.language = localStorage.getItem('lang');
    if (!this.language) {
      this.language = validLanguages.includes(navigator.language) ? navigator.language : 'en-US';
    }

    this.updateTranslate();
  }

  public languageChange() {
    localStorage.setItem('lang', this.language);

    this.updateTranslate();
  }

  private updateTranslate() {
    this.translateService.use(this.language);
  }
}
