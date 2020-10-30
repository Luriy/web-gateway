import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public get role(): 'client' | 'host' {
    return (window.sessionStorage.getItem('role') === 'host') ? 'host' : 'client';
  }

}
