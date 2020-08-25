import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  stateData: any = [];
  view: any[] = [250, 250];
  data = [];
  // options
  gradient = true;
  showLegend = true;
  isDoughnut = false;
  legendPosition = 'below';
  colorScheme = {
    domain: ['#000000', '#ff0033', '#ffe94a', '#13ff00']
  };
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getStateUpdate();
    console.log(this.stateData);
  }
  getStateUpdate() {
    const path = environment.apiUrl + '/states';
    this.http.get(path).pipe(map(data => {
      for (const key in data) {
        if (data[key].valueOf()) {
          this.stateData.push({...data[key], chart: [{name: 'death', value: data[key].deaths},
          {name: 'active', value: data[key].active},
          {name: 'recovered', value: data[key].cured}]});
      }
    }
   }))
    .subscribe((d) => {
    });
  }
  getData(data) {
    return data.chart;
  }
}
