import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private apiUrl = 'https://api.evitalrx.in/v1/patient/patients';

  constructor(private http: HttpClient) {}

  // Create a new patient (POST)
  addPatient(patient: any): Observable<any> {
    const url = `${this.apiUrl}/add`;
    return this.http.post(url, patient);
  }

  // Get all patients (GET)
  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Get a single patient by ID (GET)
  getPatientById(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  // Update an existing patient (PUT)
  updatePatient(id: string, patient: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, patient);
  }

  // Delete a patient (DELETE)
  deletePatient(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
