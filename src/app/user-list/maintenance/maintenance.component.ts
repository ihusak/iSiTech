import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserInterface, UserListService } from '../user-list.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToasterService } from '../../shared/toaster/toaster.service';
import { confirmPasswordValidator, emailValidator, passwordValidator, textValidator, userNameValidator } from './custom-directives/custom-directives';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [
    RouterLink, 
    ReactiveFormsModule
  ],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MaintenanceComponent implements OnInit {
  public hasUser: boolean = false;
  private userId: string | null = null;
  public userForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private userListService: UserListService,
    private router: Router,
    private toasterService: ToasterService
    ) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.userId = params.id;
      this.hasUser = !!this.userId;
      if(this.hasUser) {
        const user = this.userListService.userList$.getValue().find((user: UserInterface) => user.id === this.userId);
        if(user?.id) {
          this.userForm = new FormGroup({
            userName: new FormControl(user?.userName, [Validators.required, userNameValidator(this.userListService.userList$.getValue())]),
            firstName: new FormControl(user?.firstName, [Validators.required, textValidator]),
            lastName: new FormControl(user?.lastName, [Validators.required, textValidator]),
            email: new FormControl(user?.email, [Validators.required, emailValidator]),
            type: new FormControl(user?.type, Validators.required),
            password: new FormControl(user?.password, [Validators.required, passwordValidator]),
            confirmPassword: new FormControl(user?.password, [Validators.required, confirmPasswordValidator]),
          })
        } else {
          this.router.navigate(['forbidden']);
        }
      } else {
        this.userForm = new FormGroup({
          userName: new FormControl('', [Validators.required, userNameValidator(this.userListService.userList$.getValue())]),
          firstName: new FormControl('', [Validators.required, textValidator]),
          lastName: new FormControl('', [Validators.required, textValidator]),
          email: new FormControl('', [Validators.required, emailValidator]),
          type: new FormControl('', Validators.required),
          password: new FormControl('', [Validators.required, passwordValidator]),
          confirmPassword: new FormControl('', [Validators.required, confirmPasswordValidator]),
        })
      }
    });
  }
  public createUser() {
    if(this.userForm.invalid) {
      this.toasterService.toasterProp$.next({
        show: true,
        text: `Can't create user`,
        status: 'error',
        delay: 3000
      });
      return;
    }
    const newUser: UserInterface = {
      id: Math.random().toString(16).slice(2),
      userName: this.userForm.get('userName')?.value,
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      email: this.userForm.get('email')?.value,
      type: this.userForm.get('type')?.value,
      password: this.userForm.get('password')?.value
    };
    this.userListService.createNewUser(newUser).subscribe(() => {
      this.toasterService.toasterProp$.next({
        show: true,
        text: `${this.userForm.get('userName')?.value} successfully created`,
        status: 'success',
        delay: 3000
      });
      this.router.navigate(['/']);
    });
    
  }
  public deleteUser() {
    if(this.userId) {
      this.userListService.deleteUser(this.userId).subscribe(() => {
        this.toasterService.toasterProp$.next({
          show: true,
          text: `${this.userForm.get('userName')?.value} successfully deleted`,
          status: 'success',
          delay: 3000
        });
        this.router.navigate(['/']);
      });
    }
  }
  public updateUser() {
    if(this.userForm.invalid) {
      this.toasterService.toasterProp$.next({
        show: true,
        text: `Can't update ${this.userForm.get('userName')?.value}`,
        status: 'error',
        delay: 3000
      });
      return;
    }
    if(this.userId) {
      const userToUpdate: UserInterface = {
        id: this.userId,
        userName: this.userForm.get('userName')?.value,
        firstName: this.userForm.get('firstName')?.value,
        lastName: this.userForm.get('lastName')?.value,
        email: this.userForm.get('email')?.value,
        type: this.userForm.get('type')?.value,
        password: this.userForm.get('password')?.value
      };
      this.userListService.updateUser(userToUpdate).subscribe(() => {
        this.toasterService.toasterProp$.next({
          show: true,
          text: `${this.userForm.get('userName')?.value} successfully updated`,
          status: 'success',
          delay: 3000
        });
        this.router.navigate(['/']);
      });
    }
  }
}