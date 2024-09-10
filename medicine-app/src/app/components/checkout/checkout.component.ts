import { Component, OnInit } from '@angular/core';
import { MedicineService } from './../../services/medicine.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  medicines: any[] = [];
  apikey: string = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';

  constructor(
    private medicineService: MedicineService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const apikey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3'; 
    const medicine_id = 'y8P5ElKQqfn/Dkb0uhE9Sg==';
    const medicine_ids = ['ID1', 'ID2'];
    this.medicineService.getMedicineDetails(apikey, medicine_id, medicine_ids).subscribe(
      (data: any) => {
        this.medicines = data; 
      },
      (error) => {
        console.error('Error fetching medicine details', error);
      }
    );
  }

  placeOrder(): void {
    const orderDetails = this.medicines
      .filter(medicine => medicine.quantity > 0) // Ensure quantity is a positive number
      .map(medicine => ({
        id: medicine.id,
        quantity: medicine.quantity
      }));

    this.orderService.placeOrder({ items: orderDetails, apikey: this.apikey }).subscribe(
      (response) => {
        console.log('Order placed successfully', response);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error placing order', error);
      }
    );
  }
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

}
