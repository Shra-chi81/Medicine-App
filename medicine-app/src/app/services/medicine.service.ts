import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private apiUrl = 'https://api.evitalrx.in/v1/doctor/medicines/view';

  constructor(private http: HttpClient) {}

  getMedicineDetails(apikey: string, medicine_id?: string, medicine_ids?: string[]): Observable<any> {
    let params = new HttpParams().set('apikey', apikey);

    if (medicine_id) {
      params = params.set('medicine_id', medicine_id);
    }

    if (medicine_ids) {
      params = params.set('medicine_ids', medicine_ids.join(','));
    }

    return this.http.post<any>(this.apiUrl, { params });
  }
  
}
