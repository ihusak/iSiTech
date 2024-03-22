import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserInterface, UserListService } from './user-list.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToasterComponent } from "../shared/toaster/toaster.component";

@Component({
    selector: 'app-user-list',
    standalone: true,
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    encapsulation: ViewEncapsulation.None,
    imports: [RouterOutlet, RouterLink, CommonModule, ToasterComponent]
})
export class UserListComponent {
  public list$: Observable<UserInterface[]>;
  constructor(private userListService: UserListService) {
    this.list$ = this.userListService.userList$;
  }
}
