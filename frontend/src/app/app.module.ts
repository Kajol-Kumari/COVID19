import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndiaComponent } from './india/india.component';
import { DailyComponent } from './daily/daily.component';
import { HeaderComponent } from './header/header.component';
import { StateComponent } from './state/state.component';
import { ApiService } from './service/api.service';

@NgModule({
  declarations: [
    AppComponent,
    IndiaComponent,
    DailyComponent,
    HeaderComponent,
    StateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    HighchartsChartModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
