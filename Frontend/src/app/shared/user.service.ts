import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName:'',
    email:'',
    password:''
  };

  constructor(private http: HttpClient) { }

  //HttpMethods

  postUser(user:User){
    return this.http.post(environment.apiBaseUrl+'/register' , user);
  }

  login(authCredentials){
    return this.http.post(environment.apiBaseUrl + '/authenticate' ,authCredentials)
  }

  getUserProfile(){
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }

  //HelperMethods

  setToken(token:string){
    localStorage.setItem('token',token);
  }

  deleteToken(){
    localStorage.removeItem('token');
  }

  getUserPayload(){
    var token = localStorage.getItem('token');
    if(token){
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn(){
    var userPayload = this.getUserPayload();
    if(userPayload)
      return userPayload.exp > Date.now()/1000;
    else
      return false; 
  }

}
