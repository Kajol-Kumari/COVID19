import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss']
})
export class DistrictComponent implements OnInit {

  stateDistrictData: any = [];
  view: any[] = [300, 300];
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
    console.log(this.stateDistrictData);
  }
  getStateUpdate() {
    const path = environment.apiUrl + '/state_district';
    this.http.get(path).pipe(map(data => {
      for (const key in data) {
        if (!((data[key].id.valueOf()) in ['IN-DD', 'IN-DN', 'IN-LD', 'IN-AN', 'IN-CH', 'IN-DL', 'IN-JK', 'IN-LK', 'IN-PY'])) {
              data[key].districtData.valueOf().forEach(element => {
                console.log(element);
                this.stateDistrictData.push({element,
                    chart: [{name: 'deaths', value: (element.deaths !== null) ? element.deaths : 0},
                        {name: 'recovered', value: (element.recovered !== null) ? element.deaths : 0},
                        {name: 'confirmed', value: (element.confirmed !== null) ? element.confirmed : 0}]
              });
              });
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
