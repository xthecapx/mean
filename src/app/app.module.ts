import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  MatNativeDateModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatBottomSheetModule,
  MatStepperModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PinsComponent } from './pins/pins.component';
import { LayoutComponent } from './layout/layout.component';
import { MenuComponent } from './menu/menu.component';
import { ActionsComponent } from './actions/actions.component';
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [AppComponent, PinsComponent, LayoutComponent, MenuComponent, ActionsComponent, FormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatBottomSheetModule,
    MatStepperModule,
    HttpClientModule
  ],
  entryComponents: [ActionsComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
