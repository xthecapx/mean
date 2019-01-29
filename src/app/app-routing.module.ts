import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PinsComponent } from './pins/pins.component';

const routes: Routes = [
  {
    path: '',
    component: PinsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
