import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  private accountService = inject(AccountService); // Inject the account service to handle registration logic
  
  cancelRegiuster = output<boolean>(); // Output event to notify when registration is cancelled
  model: any = {}; // Initialize the model object
  toastr = inject(ToastrService); // Inject ToastrService for displaying notifications

  register() {
    console.log(this.model);
    // Here you would typically call a service to handle the registration logic
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        this.cancel();
      },
      error: (error) => {
        this.toastr.error(error.error); // Display error message using Toastr
        console.error('Registration error:', error);
      },
    });
  }

  cancel() {
    console.log('Registration cancelled');
    this.cancelRegiuster.emit(false); // Emit the cancellation event
    // Logic to handle cancellation, e.g., resetting the form or navigating away
  }
}
