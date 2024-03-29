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
    this.language = localStorage.getItem('lang');
    if (!this.language) {
      const baseLang = navigator.language || "en-US";
      baseLang.split("-")[0] === "fr"
        ? (this.language = "fr-FR")
        : baseLang.split("-")[0] === "es"
        ? (this.language = "es-ES")
        : (this.language = "en-US");
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
