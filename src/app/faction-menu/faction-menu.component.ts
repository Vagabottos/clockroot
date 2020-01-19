import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-faction-menu',
  templateUrl: './faction-menu.component.html',
  styleUrls: ['./faction-menu.component.scss'],
})
export class FactionMenuComponent implements OnInit {

  constructor(
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  close(res) {
    this.popoverCtrl.dismiss(res);
  }

}
