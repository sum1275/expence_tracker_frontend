import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BankStatementService {
  url: string = `${environment.apiUrl}mcp/statements/`;
  constructor(
    private http: HttpClient
  ) { }
  options: any = new HttpHeaders({
    'content-type': 'application/json',
  });
  bulkUpload(data: any): Observable < any > {
    return this.http.post(this.url+'bulkupload', data);
  }

  getUsersList(page: number = 1, query: string = '') {
    return this.http.get(`${this.url}listing?query=${query}&page=${page}`, {
      headers: this.options,
    });
  }
  getFilterData(filters:any,page:number = 1){
    return this.http.post(`${this.url}listingFilter?page=${page}`, filters,{
      headers: this.options
    })
  }
  getDescriptionList(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}description`);
  }
}
