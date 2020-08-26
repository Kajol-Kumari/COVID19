import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stats} from './india.models';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as Highcharts from 'highcharts';
import HC_map from 'highcharts/modules/map';
import proj4 from 'proj4';
import { ApiService } from '../service/api.service';

declare var require: any;

HC_map(Highcharts);

const worldMap = require('@highcharts/map-collection/countries/in/custom/in-all-disputed.geo.json');

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.scss']
})


@Injectable({providedIn: 'root'})
export class IndiaComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartMap: Highcharts.Options;
  indiaData: Stats[] = [];
  data = [];
  datatable = [];
  StateTotalConfirmed = [];
  StateTotalRecovered = [];
  StateTotalDeceased = [];
  StateTotalActive = [];
  totalConfirmed = 0;
  totalRecovered = 0;
  totalDeceased = 0;
  totalActive = 0;

  lastdayConfirmed = 0;
  lastdayRecovered = 0;
  lastdayDeceased = 0;
  lastday: string;
  title = '';
  PieChart;
  BarChart;
  coloR = [];

  st = 'Andaman and Nicobar Islands';
  si = 1;

  index: number;
  date = [];
  confirmedtable: number[][];
  recoveredtable: number[][];
  deceasedtable: number[][];

  view: any[] = [300, 300];

  // options
  gradient = true;
  showLegend = true;
  isDoughnut = false;
  legendPosition = 'below';

  colorScheme = {
    domain: ['#FFA500', '#ff0033', '#ffe94a', '#13ff00']
  };

  constructor(private http: HttpClient, private apiService: ApiService) {}

  ngOnInit() {
    this.getIndiaOverallStatus();
    this.apiService.getTotalData()
      .subscribe({
          next : (result) => {
            result.forEach(element => {
              this.date = element.date;
              this.confirmedtable = element.confirm;
              this.recoveredtable = element.recover;
              this.deceasedtable = element.decease;
            });

            for (let i = 0; i < 37; i++) {
              this.StateTotalConfirmed[i] = 0;
              this.StateTotalDeceased[i] = 0;
              this.StateTotalRecovered[i] = 0;
            }
            this.totalConfirmed = 0;
            this.totalRecovered = 0;
            this.totalDeceased = 0;
            this.totalActive = 0;

            this.index = +this.date.length;
            for (let i = 0; i < this.index; i++) {
              this.totalConfirmed += this.confirmedtable[0][i];
              this.totalRecovered += this.recoveredtable[0][i];
              this.totalDeceased += this.deceasedtable[0][i];
            }

            this.totalActive = this.totalConfirmed - (this.totalRecovered + this.totalDeceased);
            this.lastdayConfirmed = this.confirmedtable[0][this.index - 1];
            this.lastdayRecovered = this.recoveredtable[0][this.index - 1];
            this.lastdayDeceased = this.deceasedtable[0][this.index - 1];
            this.lastday = this.date[this.index - 1];
            // this.initBarChart('c');

            for (let i = 0; i < 37; i++) {
              for (let j = 0; j < this.index; j++) {
                this.StateTotalConfirmed[i] += this.confirmedtable[i + 1][j];
                this.StateTotalRecovered[i] += this.recoveredtable[i + 1][j];
                this.StateTotalDeceased[i] += this.deceasedtable[i + 1][j];
              }
              this.StateTotalActive[i] = this.StateTotalConfirmed[i] - (this.StateTotalRecovered[i] + this.StateTotalDeceased[i]);
            }
            this.initMap('u');
          }
        });
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

  initMap(caseType: string) {

    this.datatable = [];
    if (caseType === 'u') {
      this.title = 'Confirmed Cases';
      this.datatable = this.StateTotalConfirmed;
    }
    if (caseType === 'v') {
      this.title = 'Deceased Cases';
      this.datatable = this.StateTotalDeceased;
    }
    if (caseType === 'w') {
      this.title = 'Recovered Cases';
      this.datatable = this.StateTotalRecovered;
    }
    if (caseType === 'p') {
      this.title = 'Active Cases';
      this.datatable = this.StateTotalActive;
    }
    this.chartMap = {
      chart: {
        map: worldMap as any,
        proj4
      },
      title: {
        text: ``
      },
      subtitle: {
        text: `<b>Hover over the map to visualize the COVID-19 data state wise</b>`
      },
      plotOptions: {
        series: {
          point: {
            events: {
              mouseOver() {

              }
            }
          }
        }
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          alignTo: 'spacingBox'
        }
      },
      legend: {
        enabled: true
      },
      colorAxis: {
        min: 0
      },
      series: [{
        name: this.title,
        states: {
          hover: {
            color: '#FF0000'
          }
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}'
        },
        allAreas: false,
        data: [
          ['andaman and nicobar', this.datatable[0]],
          ['andhra pradesh', this.datatable[1]],
          ['arunanchal pradesh', this.datatable[2]],
          ['assam', this.datatable[3]],
          ['bihar', this.datatable[4]],
          ['chandigarh', this.datatable[5]],
          ['chhattisgarh', this.datatable[6]],
          ['dadara and nagar havelli', this.datatable[7]],
          ['daman and diu', this.datatable[8]],
          ['nct of delhi', this.datatable[9]],
          ['goa', this.datatable[10]],
          ['gujarat', this.datatable[11]],
          ['haryana', this.datatable[12]],
          ['himachal pradesh', this.datatable[13]],
          ['jammu and kashmir', this.datatable[14]],
          ['jharkhand', this.datatable[15]],
          ['karnataka', this.datatable[16]],
          ['kerala', this.datatable[17]],
          ['lakshadweep', this.datatable[19]],
          ['madhya pradesh', this.datatable[20]],
          ['maharashtra', this.datatable[21]],
          ['manipur', this.datatable[22]],
          ['meghalaya', this.datatable[23]],
          ['mizoram', this.datatable[24]],
          ['nagaland', this.datatable[25]],
          ['odisha', this.datatable[26]],
          ['puducherry', this.datatable[27]],
          ['punjab', this.datatable[28]],
          ['rajasthan', this.datatable[29]],
          ['sikkim', this.datatable[30]],
          ['tamil nadu', this.datatable[31]],
          ['telangana', this.datatable[32]],
          ['tripura', this.datatable[33]],
          ['uttar pradesh', this.datatable[34]],
          ['uttarakhand', this.datatable[35]],
          ['west bengal', this.datatable[36]]
        ]
      } as Highcharts.SeriesMapOptions]
    };
  }
}
