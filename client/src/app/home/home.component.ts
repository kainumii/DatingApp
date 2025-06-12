import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent  {

    registerMode = false;

    cancelRegister(event: boolean) {
        this.registerMode = event; // Update the registerMode based on the event received
        console.log('Registration mode cancelled:', this.registerMode);
    }

    toggleRegister() {
        this.registerMode = !this.registerMode;
  }
 
}
