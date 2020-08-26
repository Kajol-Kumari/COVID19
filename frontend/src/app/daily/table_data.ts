export interface TableElement {
  date: string;
  position: number;
  confirmed: number;
  recovered: number;
  deceased: number;
}

export interface TotalDailyData {
  date: string[];
  confirm: number[][];
  recover: number[][];
  decease: number[][];
}

export interface TotalData {
  date: string[];
  confirm: number[][];
  recover: number[][];
  decease: number[][];
}
