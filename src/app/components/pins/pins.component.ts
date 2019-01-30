import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RepositoryService } from 'src/app/services/repository.service';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PinsComponent {
  public step = 0;
  public pins = [];

  constructor(private repository: RepositoryService) {}

  ngOnInit() {
    this.repository.getPins().subscribe(pins => {
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
