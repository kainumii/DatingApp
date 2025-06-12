import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Member } from '../../_models/Member';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  imports: [TabsModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
    accountService = inject(AccountService);
    member: Member | undefined;
    membersService = inject(MembersService);
    private toastr = inject(ToastrService); // Inject ToastrService for notifications (if needed)
    @ViewChild('editForm') editForm: NgForm | undefined; // ViewChild to access the form for validation§


    ngOnInit() {
        this.loadMember();
    }
    
    loadMember() {
        const username = this.accountService.currentUser()?.username;

        if (username) {
            this.membersService.getMember(username).subscribe({
                next: member => {
                    this.member = member as Member; // Assign the loaded member to the component's member property
                },
                error: error => {
                    console.error('Error loading member:', error); // Log any errors that occur during the loading process
                }
            });
        } else {
            console.error('No username found in current user'); // Log an error if no username is available
        }
    }
    
    update() {
        if (!this.member) return;
        
        // Use the complete member object for the update
        // Only modified fields will be updated on the server side
        console.log('Sending update data:', this.member);

        // OR?
        // this.membersService.updateMember(this.editForm?.value).subscribe({
        //     next: () => {
        //         // Handle successful update
        //         this.toastr.success('Profile updated successfully');
        //     }
        // });
        
        this.membersService.updateMember(this.member).subscribe({
            next: () => { 
                this.toastr.success('Profile updated successfully');
                this.editForm?.reset(this.member);
            },
            error: error => {
                console.error('Update error:', error);
                this.toastr.error('Failed to update profile: ' + (error.error || 'Unknown error'));
            }
        });
    }   

}
