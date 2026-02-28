import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-faction-menu',
  templateUrl: './faction-menu.component.html',
  styleUrls: ['./faction-menu.component.scss'],
})
export class FactionMenuComponent implements OnInit {

  public originalFactions = [
    {
      name: 'Automated Alliance',
      id: 'Woodland',
      icon: 'woodland'
    },
    {
      name: 'Electric Eyrie',
      id: 'Eyrie',
      icon: 'eyrie'
    },
    {
      name: 'Mechanical Marquise',
      id: 'Marquise',
      icon: 'marquise'
    },
    {
      name: 'Vagabot',
      id: 'Vagabond',
      icon: 'vagabond'
    }
  ];

  public dcFactions = [
    {
      name: 'Automated Alliance (DC)',
      id: 'WoodlandDC',
      icon: 'woodland'
    },
    {
      name: 'Electric Eyrie (DC)',
      id: 'EyrieDC',
      icon: 'eyrie'
    },
    {
      name: 'Mechanical Marquise (DC)',
      id: 'MarquiseDC',
      icon: 'marquise'
    },
    {
      name: 'Vagabot (DC)',
      id: 'VagabondDC',
      icon: 'vagabond'
    }
  ];

  public expansion2Factions = [
    {
      name: 'Cogwheel Corvids',
      id: 'Corvid',
      icon: 'corvid'
    },
    {
      name: 'Drillbit Duchy',
      id: 'Duchy',
      icon: 'duchy'
    },    
        {
      name: 'Logical Lizards',
      id: 'Lizard',
      icon: 'lizard'
    },
        {
      name: 'Riverfolk Robots',
      id: 'Riverfolk',
      icon: 'riverfolk'
    }
  ];

  public expansion3Factions = [
    {
      name: 'Looting Legion',
      id: 'Legion',
      icon: 'legion'
    }
  ]

  constructor(
    public popoverCtrl: PopoverController
  ) { }

  ngOnInit() {}

  close(res) {
    this.popoverCtrl.dismiss(res);
  }

}
