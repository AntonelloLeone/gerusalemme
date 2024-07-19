import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = environment.apiUrl + 'TablesControllercs/tables';
  private apiTable = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTableNames(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  getTableData(tabella: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiTable}${tabella}`);
  }
}
