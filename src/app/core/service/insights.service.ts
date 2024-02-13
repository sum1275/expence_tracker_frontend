import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InsightsService {
  url: string = `${environment.apiUrl}mcp/statements/`;
  constructor(
    private http: HttpClient
  ) { }
  options: any = new HttpHeaders({
    'content-type': 'application/json',
  });
  creditDonut(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}creditchart`);
  }
  debitDonut(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}debitchart`);
  }
}
