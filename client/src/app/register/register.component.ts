import { Component, inject, input, OnInit, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, NgIf, NgFor],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private accountService = inject(AccountService); // Inject the account service to handle registration logic
  private router = inject(Router); // Inject the router to navigate after registration

  cancelRegiuster = output<boolean>(); // Output event to notify when registration is cancelled
  model: any = {}; // Initialize the model object
  toastr = inject(ToastrService); // Inject ToastrService for displaying notifications

  validationErrors: string[] | undefined;
  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    // Initialization logic can go here if needed
    this.initForm();
  }
  initForm() {
    this.registerForm = new FormGroup({
      knownAs: new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
      country: new FormControl('', {
        validators: [Validators.required],
      }),
      gender: new FormControl('male', {
        validators: [Validators.required],
      }),
      dateOfBirth: new FormControl(null, {
        validators: [Validators.required],
      }),
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          // Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/)
        ],
        nonNullable: true,
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, this.matchValues('password')],
        nonNullable: true,
      }),
    });
  }

  // Custom validator to check if passwords match
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const controlToMatch = control.parent?.get(matchTo);
      return controlToMatch && control.value !== controlToMatch.value
        ? { notMatching: true }
        : null;
    };
  }

  register() {
   
    this.registerForm.markAllAsTouched(); // Mark all form controls as touched to trigger validation messages

    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.value).subscribe({
        next: (_) => this.router.navigateByUrl('/members'),
        error: (error) => {
          console.log(error);
          this.validationErrors = [];

          if (error.error.errors) {
            console.log(error.error.errors);
            for (const key in error.error.errors) {
              if (Array.isArray(error.error.errors[key])) {
                this.validationErrors.push(...error.error.errors[key]);
              }
            }
          } else {
            this.validationErrors.push('werrwerewrwer');
          }
        },
      });
    }
    else {
      console.log('Form is invalid');
      this.validationErrors = ['Please fill out the form correctly.'];
    }
  }

  cancel() {
    console.log('Registration cancelled');
    this.cancelRegiuster.emit(false); // Emit the cancellation event
    // Logic to handle cancellation, e.g., resetting the form or navigating away
  }
}
