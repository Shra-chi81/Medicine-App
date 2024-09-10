import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent implements OnInit {
  addPatientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private patientService:PatientService
  ) {
    this.addPatientForm = this.fb.group({
      apikey: ['', Validators.required],
      zipcode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      mobile: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      first_name: ['', Validators.required],
      last_name: [''],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      blood_group: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.addPatientForm.valid) {
      const patientData = this.addPatientForm.value;
      this.patientService.addPatient(patientData).subscribe(
        (res) => {
          console.log('Patient added successfully', res); 
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error adding patient', error); 
        }
      );
    } else {
      console.error('Form is invalid'); 
    }

  }

}
