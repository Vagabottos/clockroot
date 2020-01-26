import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-faction-menu',
  templateUrl: './faction-menu.component.html',
  styleUrls: ['./faction-menu.component.scss'],
})
export class FactionMenuComponent implements OnInit {

  public factions = [
    {
      name: 'Mechanical Marquise',
      id: 'Marquise',
      icon: 'marquise'
    },
    {
      name: 'Automated Alliance',
      id: 'Alliance',
      icon: 'woodland',
      disabled: true
    },
    {
      name: 'Clockwork Cult',
      id: 'Cult',
      icon: 'cult',
      disabled: true
    },
    {
      name: 'Electric Eyrie',
      id: 'Eyrie',
      icon: 'eyrie',
      disabled: true
    },
    {
      name: 'Otter Overlords',
      id: 'Riverfolk',
      icon: 'riverfolk',
      disabled: true
    },
    {
      name: 'Robot Raccoon',
      id: 'Vagabond',
      icon: 'vagabond',
      disabled: true
    }
  ];

  constructor(
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  close(res) {
    this.popoverCtrl.dismiss(res);
  }

}
