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
import { PinsComponent } from './components/pins/pins.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { ActionsComponent } from './components/actions/actions.component';
import { FormComponent } from './components/form/form.component';
import { ApiService } from './services/api.service';
import { RepositoryService } from './services/repository.service';
import { NavigationService } from './services/navigation.service';

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
  providers: [ApiService, RepositoryService, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
