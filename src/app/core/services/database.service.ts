import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private baseApiUrl = environment.apiUrl;
  private apiUrl = environment.apiUrl + 'TablesControllercs/tables';
  private apiTable = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTableNames(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }

  getTableData(tabella: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiTable}${tabella}`);
  }

  genericDelete(id:number , tableName: string | null): Observable<void>{
    let realTableName = '';
    if(tableName != null){
      realTableName = this.transformTableName(tableName);
    }
   
    const url = `${this.baseApiUrl}${realTableName}/${id}`;
    console.log(url);
    return this.http.delete<void>(url);
  }

  private transformTableName(tableName: string): string {
    return tableName
      .replace(/_/g, ' ') 
      .replace(/\b\w/g, char => char.toUpperCase()) 
      .replace(/ /g, ''); 
  }

}
