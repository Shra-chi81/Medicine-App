import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService : AuthService,
    private router: Router

  ) {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], 
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    
  }
  
  onSubmit() {
    if (this.loginForm.valid) {
      const apikey = 'wFIMP75eG1sQEh8vVAdXykgzF4mLhDw3';
      const { mobile, password } = this.loginForm.value;
      this.authService.login(mobile, password,apikey).subscribe(
        (response) => {
          if (response) {
            console.log('Login successful', response);
            this.router.navigate(['/dashboard']); 
          }
        },
        (error) => {
          console.error('Login failed', error);
          alert('Invalid credentials');
        }
      );
    }
  }
  

}




