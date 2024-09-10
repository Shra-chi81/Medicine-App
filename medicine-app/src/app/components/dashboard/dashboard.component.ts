import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  medicines: any[] = [];
  searchTerm: string = '';
  isOpened: boolean = true;
  currentUrl: string ='';
  isPatientRoute: boolean = false;


  constructor(
    private http: HttpClient,
    private apiService : ApiService,
    private router: Router, private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchMedicines();
    this.router.events.subscribe(() => {
      this.isPatientRoute = this.router.url === '/patient';
    });
  }

  searchMedicines() {
    this.http
      .get(`https://dev-api.evitalrx.in/v1/fulfillment/medicines`)
      .subscribe((data: any) => {
        this.medicines = data;
        console.log(data,"<<<<<<<<<<<<")
      });
  }

}

