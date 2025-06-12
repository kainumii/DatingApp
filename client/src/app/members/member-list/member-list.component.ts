import { Component, inject, OnInit } from '@angular/core';
import { MembersService } from '../../_services/members.service';
import { Member } from '../../_models/Member';
import { MemberCardComponent } from "../member-card/member-card.component";

@Component({
  selector: 'app-member-list',
  imports: [MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {

    private membersService = inject(MembersService);
  
  // You can inject services here if needed
  // private membersService = inject(MembersService);
  
  // Define any properties you need for the component
  members: Member[] = []; // Replace 'any' with your actual member type

  ngOnInit() {
    // Call a service to get the list of members when the component initializes
    // this.membersService.getMembers().subscribe(members => {
    //   this.members = members;
    // });

    this.loadMembers();
  }
    loadMembers() {
       this.membersService.getMembers().subscribe({
        next: members => { this.members = members as Member[]; },
        error: error => console.error('Error loading members:', error)
       });
    }
  
  // Add any additional methods needed for the component

}
