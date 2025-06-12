import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { Member } from '../_models/Member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {

    private http = inject(HttpClient);
    // Assuming you have an AccountService that provides the current user's token
    private accountService = inject(AccountService);
    private baseUrl = 'https://localhost:5001/api/';

    getMembers() {
        const options = {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.accountService.currentUser()?.token || ''}`
            })
        };    

        // This method retrieves a list of members from the API        
        return this.http.get(this.baseUrl + 'users', options);
    }

    getMember(username: string) {
        
        const options = {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.accountService.currentUser()?.token || ''}`
            })
        };    

        return this.http.get(this.baseUrl + 'users/' + username, options);
    }  

    updateMember(member: Member) {
       const options = {
            headers: new HttpHeaders({
                Authorization: `Bearer ${this.accountService.currentUser()?.token || ''}`
            })
        };    


        // This method updates a member's details in the API
        return this.http.put(this.baseUrl + 'users', member, options);
    }
}
