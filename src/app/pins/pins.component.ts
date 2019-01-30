import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PinsComponent {
  public step = 0;
  /* public pins = [
    {
      title: 'Learning path 1',
      author: 'Cristian Marquez',
      description: 'Description',
      group: 'Javascript',
      percentage: 0,
      completed: true,
      url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
      tags: ['Javascript', 'Code', 'Video'],
      assets: [
        {
          url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
          title: 'Video Title',
          description: 'Video description',
          readed: false
        },
        {
          url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
          title: 'Video Title',
          description: 'Video description',
          readed: false
        },
        {
          url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
          title: 'Video Title',
          description: 'Video description',
          readed: false
        }
      ],
      assetsOptions: ['Video 1', 'Video 2', 'Video 3']
    },
    {
      title: 'Learning path 2',
      author: 'Cristian Marquez',
      description: 'Description',
      group: 'Javascript',
      percentage: 50,
      completed: true,
      url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
      tags: ['Javascript', 'Code', 'Video'],
      assets: [
        {
          url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
          title: 'Video Title',
          description: 'Video description',
          readed: true
        },
        {
          url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
          title: 'Video Title',
          description: 'Video description',
          readed: false
        },
        {
          url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
          title: 'Video Title',
          description: 'Video description',
          readed: false
        }
      ],
      assetsOptions: ['Video 1', 'Video 2', 'Video 3']
    },
    {
      title: 'Learning path 3',
      author: 'Cristian Marquez',
      description: 'Description',
      group: 'Javascript',
      percentage: 100,
      completed: true,
      url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
      tags: ['Javascript', 'Code', 'Video'],
      assets: [
        {
          url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
          title: 'Video Title',
          description: 'Video description',
          readed: true
        },
        {
          url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
          title: 'Video Title',
          description: 'Video description',
          readed: true
        },
        {
          url: 'https://www.youtube.com/watch?v=mC2LRZ23AFU',
          title: 'Video Title',
          description: 'Video description',
          readed: true
        }
      ],
      assetsOptions: ['Video 1', 'Video 2', 'Video 3']
    }
  ]; */
  public pins = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('/api').subscribe((pins: Object[]) => {
      this.pins = pins;
    });
  }

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
