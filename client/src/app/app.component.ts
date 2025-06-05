import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {

  private accountService = inject(AccountService);
  
  ngOnInit(): void {

    this.setCurrentUser();
    // You can also call this.accountService.setCurrentUser() if you want to use that method instead    
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');    
    if (userString) {
      const user = JSON.parse(userString);  
      this.accountService.currentUser.set(user);
      console.log('Current user set:', user);
    }
  }

  
}
