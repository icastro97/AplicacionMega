/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class LoginServiceService {

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  baseUrl = 'https://megalabs.app/api';
  constructor(private http: HttpClient){}

  public get userValue(): User{
    return this.userSubject.value;
  }

  login(email, password){
    return this.http.post<User>(`${this.baseUrl}/loginapp`, {email, password}).pipe(
      map(user =>{
        localStorage.setItem('user',JSON.stringify(user));
        return user;
      }));
  }
}
