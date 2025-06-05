import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  model: any = {};
  accountService = inject(AccountService);

  login() {
    this.accountService.login(this.model).subscribe({
      next: (resp) => {
        console.log(resp);
      },
      error: error => console.error('Login failed', error),
      // The 'complete' callback is optional, but can be useful for cleanup or final actions  
      complete: () => console.log('Login request completed')
    }); 
  } 

  logout() {
     this.accountService.logout();
    
  }
}

// If you're using standalone components throughout your app:
// You need to make sure BsDropdownModule.forRoot() is called somewhere
// This is typically in the main AppComponent or a shared module

// No changes needed to your current file - it's already correct for standalone components
// Just ensure .forRoot() is called in your app's bootstrap sequence
