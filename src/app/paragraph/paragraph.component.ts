import { Component, Input, OnInit } from '@angular/core';
import { Bot } from '../models/bot';
import { RendererService } from '../renderer.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';

export interface MetaData {
    text: string;
    type: string;
    value: any;
}

@Component({
    selector: 'para',
    templateUrl: './paragraph.component.html',
    styleUrls: ['./paragraph.component.scss'],
})

export class ParagraphComponent implements OnInit {

    @Input() public metadata: MetaData;
    @Input() public bot: Bot;

    ngOnInit() {}

    constructor(
        public rendererService: RendererService,
        public translateService: TranslateService,
        public toastController: ToastController
    ) {}

    public async updateScore(score: number): Promise<void> {
        this.bot.addVP(score);
        const toast = await this.toastController.create({
            message: this.translateService.instant('ToastMessages.UpdateScore', { botname: this.bot.name, addend: score }),
            duration: 3000,
            position: 'bottom',
            buttons: [
                {
                    text: 'Undo',
                    handler: () => {
                        this.bot.addVP(-score);
                    }
                }
            ]
        });
        toast.present();
    }
}