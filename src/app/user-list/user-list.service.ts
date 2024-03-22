import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, map, of } from 'rxjs';
import { usersMockData } from './users-data';

export interface UserInterface {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  type: string;
  password?: string;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  public userList$: BehaviorSubject<UserInterface[]> = new BehaviorSubject<UserInterface[]>(usersMockData);
  constructor() { }
  public createNewUser(user: UserInterface): Observable<any> {
    return of(null).pipe(
      delay(1000),
      map(() => {
        return this.userList$.next([user, ...this.userList$.getValue()]);
      })
    )
  }
  public deleteUser(userId: string): Observable<any> {
    return of(null).pipe(
      delay(1000),
      map(() => {
        const fileredUsers = this.userList$.getValue().filter((user: UserInterface) => user.id !== userId);
        this.userList$.next(fileredUsers);
      })
    )
  }
  public updateUser(userToUpdate: UserInterface): Observable<any> {
    return of(null).pipe(
      delay(1000),
      map(() => {
        const USERS = this.userList$.getValue().map((user: UserInterface) => {
          if(user.id === userToUpdate.id) {
            return userToUpdate;
          }
          return user;
        });
        this.userList$.next(USERS);
      })
    )
  }
}
