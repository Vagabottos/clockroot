import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-priority-modal',
  templateUrl: './priority-modal.component.html',
  styleUrls: ['./priority-modal.component.scss'],
})
export class PriorityModalComponent implements OnInit {

  public img = 'fall';

  public buttonsAndImages = [
    {
      name: 'Fall',
      map: 'fall'
    },
    {
      name: 'Winter',
      map: 'winter'
    },
    {
      name: 'Lake',
      map: 'lake'
    },
    {
      name: 'Mountain',
      map: 'mountain'
    }
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  changeMap(img) {
    this.img = img;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
