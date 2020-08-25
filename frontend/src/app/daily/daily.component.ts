import { Component, OnInit, Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Stats} from '../india/india.models';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {
  indiaData: Stats[] = [];
  data = [];
  // single: any[];
  view: any[] = [300, 300];
  // search = '';
  // countrylist = [];

  // options
  gradient = true;
  showLegend = true;
  isDoughnut = false;
  legendPosition = 'below';

  colorScheme = {
    domain: ['#FFA500', '#ff0033', '#ffe94a', '#13ff00']
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getIndiaOverallStatus();
    console.log(this.indiaData);
  }


    getIndiaOverallStatus() {
      const path = environment.apiUrl + '/country';
      this.http.get(path).pipe(map(data => {
        for (const key in data) {
          if (data[key].country.valueOf() === 'India') {
            this.indiaData.push({...data[key]});
          }
        }
     }))
      .subscribe((d) => {

        console.log(this.indiaData[0].chart);
      });
  }
}
