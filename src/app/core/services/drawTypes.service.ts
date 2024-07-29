import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DrawTypeDto } from '../DrawType';

@Injectable({
  providedIn: 'root'
})
export class DrawTypesService {
  private baseApiUrl = environment.apiUrl;
  private apiUrl = this.baseApiUrl+'DrawTypes';

  constructor(private http: HttpClient) {}

  post(drawTypeItem: DrawTypeDto): Observable<DrawTypeDto> {
    return this.http.post<DrawTypeDto>(this.apiUrl, drawTypeItem);
  }

  getDrawTypeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  put(id: string, drawTypeItem: DrawTypeDto): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, drawTypeItem);
  }
}
