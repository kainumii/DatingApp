import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
  model: any = {};
  accountService = inject(AccountService);
  toastr = inject(ToastrService);
  router = inject(Router);

  login() {
    this.accountService.login(this.model).subscribe({
      next: () => {        
        this.router.navigateByUrl('/members'); // Navigate to the home page after successful login
      },
      error: error => this.toastr.error(error.error),
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
