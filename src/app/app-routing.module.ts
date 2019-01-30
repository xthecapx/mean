import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { PinsComponent } from './pins/pins.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      {
        path: 'pins',
        component: PinsComponent
      },
      {
        path: 'add',
        component: FormComponent
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'app/pins'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
