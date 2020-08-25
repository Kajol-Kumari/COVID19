import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stats} from './india.models';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.scss']
})


@Injectable({providedIn: 'root'})
export class IndiaComponent implements OnInit {

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
            this.indiaData.push({...data[key], chart: [{name: 'death', value: data[key].deaths.total.valueOf()},
            {name: 'critical', value: data[key].cases.critical.valueOf()},
            {name: 'active', value: data[key].cases.active.valueOf()},
            {name: 'recovered', value: data[key].cases.recovered.valueOf()}]});
          }
        }
     }))
      .subscribe((d) => {

        console.log(this.indiaData[0].chart);
      });
  }
  getData(data) {
    return data.chart;
  }

}
