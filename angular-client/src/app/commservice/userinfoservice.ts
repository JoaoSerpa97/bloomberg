import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '../django_classes';

@Injectable()
export class UserInfoService {

  // Observable user source
  private currentUser = new BehaviorSubject<User>(null);

  // Serves as warning for main component to check for login changes
  private currentPing = new BehaviorSubject<number>(0);

  // Observable user stream
  userObs$ = this.currentUser.asObservable();

  // Observable user stream
  pingObs$ = this.currentUser.asObservable();



  // Service message commands
  setUser(user: User) {
    this.currentUser.next(user);
  }

  ping(){
    this.currentPing.next(this.currentPing.getValue() + 1);
  }
}
