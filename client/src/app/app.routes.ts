import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { DemoComponent } from './demo/demo.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'members', component: MemberListComponent },
  { path: 'members/:username', component: MemberDetailComponent },
  { path: 'member/edit', component: MemberEditComponent }, 
  { path: 'lists', component: ListsComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'demo', component: DemoComponent },
  { path: '**', component: HomeComponent },
];
