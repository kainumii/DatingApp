import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {

cancelRegister(event: boolean) {
    this.registerMode = event; // Update the registerMode based on the event received
    console.log('Registration mode cancelled:', this.registerMode);
}
  ngOnInit(): void {
    this.fetchUsers();
  }

  http = inject(HttpClient);
  registerMode = false;

  users: any;

  toggleRegister() {
    this.registerMode = !this.registerMode;
  }

  fetchUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.error('Error fetching users:', error),
      complete: () => console.log('User fetch complete'),
    });
  }
}
