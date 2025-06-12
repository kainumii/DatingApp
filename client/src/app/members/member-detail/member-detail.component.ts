import { Component, inject, OnInit } from '@angular/core';
import { Member } from '../../_models/Member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-detail',
  imports: [TabsModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
  

    private memberService = inject(MembersService);
    member: Member | undefined;
    private route = inject(ActivatedRoute); // Inject ActivatedRoute to access route parameters
    


    ngOnInit() {
        const username = this.route.snapshot.paramMap.get('username'); // Get the 'username' parameter from the route
        if (username) {
            this.loadMember(username); // Load the member details using the username
        }
    }

    loadMember(username: string) {
        this.memberService.getMember(username).subscribe({
            next: member => {
                this.member = member as Member; // Assign the loaded member to the component's member property
            },
            error: error => {
                console.error('Error loading member:', error); // Log any errors that occur during the loading process
            }   
        });
    }

   

}
