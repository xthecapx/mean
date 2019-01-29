import { Component } from '@angular/core';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss']
})
export class PinsComponent {
  public step = 0;
  public pins = [
    {
      title: 'Title 1',
      author: 'Cristian Marquez',
      description: 'Description',
      group: 'Javascript',
      completed: true,
      url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
      tags: ['Javascript', 'Code', 'Video']
    },
    {
      title: 'Title 2',
      author: 'Cristian Marquez',
      description: 'Description 2',
      group: 'Javascript',
      completed: false,
      url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
      tags: ['Javascript', 'Code', 'Video']
    },
    {
      title: 'Title 3',
      author: 'Cristian Marquez',
      description: 'Description 3',
      group: 'Javascript',
      completed: false,
      url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
      tags: ['Javascript', 'Code', 'Video']
    }
  ];

  public setStep(index: number) {
    this.step = index;
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }
}
