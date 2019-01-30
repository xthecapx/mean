import { Component, ViewEncapsulation } from '@angular/core';
import { RepositoryService } from 'src/app/services/repository.service';
import { MatSnackBar, MatBottomSheetRef, MatBottomSheet } from '@angular/material';
import { PinsService } from './pins.service';
import { ActionsComponent } from '../actions/actions.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-pins',
  templateUrl: './pins.component.html',
  styleUrls: ['./pins.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PinsComponent {
  public step = 0;
  public pins = [];

  constructor(private repository: RepositoryService, private snackBar: MatSnackBar, private pinsService: PinsService) {}

  ngOnInit() {
    this.repository.getPins().subscribe(pins => {
      this.pins = pins;
    });

    this.pinsService.$actionObserver.pipe(filter(action => action === 'save')).subscribe(action => {
      this.updateProgress(this.step);
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

  public updateProgress(index) {
    const pin = this.pins[index];

    this.repository.updatePin(pin._id, pin).subscribe(pin => {
      this.snackBar.open('Progress updated!', 'OK', {
        duration: 2000
      });
    });
  }
}
