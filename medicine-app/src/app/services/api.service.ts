import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://dev-api.evitalrx.in/v1/fulfillment/';

  constructor(private http: HttpClient) { }

  searchMedicines(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?query=${query}`, {
      headers: { 'Authorization': 'Bearer wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3' }
    });
  }

  getMedicines(search: string): Observable<any> {
    return this.http.get(`${this.apiUrl}medicines?search=${search}`);
  }

}



