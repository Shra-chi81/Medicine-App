import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private placeOrderUrl = 'https://api.evitalrx.in/v1/doctor/orders/place'; 
  private viewOrderUrl = 'https://api.evitalrx.in/v1/doctor/orders/view'; 

  constructor(private http: HttpClient) {}

  // Place an Order
  placeOrder(orderDetails: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.placeOrderUrl, orderDetails, { headers });
  }

  // View an Order
  viewOrder(order_id: string, apikey: string, order_number?: string): Observable<any> {
    const body = {
      order_id: order_id,
      apikey: apikey,
      order_number: order_number
    };

    return this.http.post<any>(this.viewOrderUrl, body);
  }
}
