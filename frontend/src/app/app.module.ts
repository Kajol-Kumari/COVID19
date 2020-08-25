import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndiaComponent } from './india/india.component';
import { DailyComponent } from './daily/daily.component';
import { HeaderComponent } from './header/header.component';
import { DistrictComponent } from './district/district.component';
import { StateComponent } from './state/state.component';

@NgModule({
  declarations: [
    AppComponent,
    IndiaComponent,
    DailyComponent,
    HeaderComponent,
    DistrictComponent,
    StateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
