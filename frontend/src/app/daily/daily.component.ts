import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableElement, TotalDailyData } from './table_data';
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
  TableData: TableElement[] = [];
  displayedColumns: string[] = ['position', 'date', 'confirmed', 'recovered', 'deceased'];
  dataSource = new MatTableDataSource<TableElement>(this.TableData);
  view: any[] = [300, 300];
  d = 0;
  date = [];
  index: number;
  confirmedtable: number[][];
  recoveredtable: number[][];
  deceasedtable: number[][];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
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
    this.getTotalData();
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

  getTotalData() {
    const path = `https://api.covid19india.org/csv/latest/state_wise_daily.csv`;
    this.http.get(path, { responseType: 'text' })
    .pipe(
      map(result => {
        this.confirmedtable = [];
        for (let i = 0; i < 38; i++) {
          this.confirmedtable[i] = [];
        }
        this.recoveredtable = [];
        for (let i = 0; i < 38; i++) {
          this.recoveredtable[i] = [];
        }
        this.deceasedtable = [];
        for (let i = 0; i < 38; i++) {
          this.deceasedtable[i] = [];
        }
        this.date = [];

        const data: TotalDailyData[] = [];
        const rows = result.split('\n');
        rows.splice(0, 1);
        rows.forEach(row => {
          const cols = row.split(',');

          if (this.d % 3 === 0) {
          this.date.push(cols[0]);
          }

          this.d += 1;

          for (let i = 0; i < 38; i++) {
            if (cols[1] === 'Confirmed') {
              this.confirmedtable[i].push(+cols[i + 2]);
            } else if (cols[1] === 'Recovered') {
              this.recoveredtable[i].push(+cols[i + 2]);
            } else {
                this.deceasedtable[i].push(+cols[i + 2]);
            }
          }
        });
        data.push({date : this.date,
                  confirm : this.confirmedtable,
                  recover : this.recoveredtable,
                  decease : this.deceasedtable});
        return data;
      })
    ).subscribe({
      next : (result) => {
        result.forEach(element => {
          this.date = element.date;
          this.confirmedtable = element.confirm;
          this.recoveredtable = element.recover;
          this.deceasedtable = element.decease;
        });
        this.index = +this.date.length;
        for (let i = 0; i < this.index; i++) {
          this.TableData[i] = ({position: +i + 1,
                                  date: this.date[i],
                                  confirmed: this.confirmedtable[0][i],
                                  deceased: this.deceasedtable[0][i],
                                  recovered: this.recoveredtable[0][i]});
        }
        this.dataSource.paginator = this.paginator;


    }
  });
  }
}
