import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    usersFromHomeComponent = input.required<any>(); // Input property to control the visibility of the registration form
  cancelRegiuster = output<boolean>(); // Output event to notify when registration is cancelled
  model: any = {}; // Initialize the model object

  register() {
    console.log(this.model);
    // Here you would typically call a service to handle the registration logic
    // For example: this.accountService.register(this.model).subscribe(...);  
  } 

  cancel() {
    console.log('Registration cancelled');
    this.cancelRegiuster.emit(false); // Emit the cancellation event
    // Logic to handle cancellation, e.g., resetting the form or navigating away
  } 
}
