import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TotalData } from '../daily/table_data';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private DataUrl = `https://api.covid19india.org/csv/latest/state_wise_daily.csv`;

  dataCount = 0;
  date = [];
  confirmedtable: number[][];
  recoveredtable: number[][];
  deceasedtable: number[][];

  constructor(private http: HttpClient) { }

  getTotalData() {
    return this.http.get(this.DataUrl, { responseType: 'text' })
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

        const data: TotalData[] = [];
        const rows = result.split('\n');
        rows.splice(0, 1);
        rows.forEach(row => {
          const cols = row.split(',');

          if (this.dataCount % 3 === 0) {
          this.date.push(cols[0]);
          }

          this.dataCount += 1;

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
    );
  }
}
