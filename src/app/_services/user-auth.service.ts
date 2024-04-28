import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles:[]){
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): []{
    var roleInStorage = localStorage.getItem('roles');
    if(roleInStorage!=null){
      return JSON.parse(roleInStorage);
    }
    return [];
  }

  public setToken(jwtToken: string){
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string{
    var jwtToken = localStorage.getItem('jwtToken');
    if(jwtToken!=null){
      return jwtToken;
    }
    return '';
  }

  public clear(){
    localStorage.clear();
  }

  public isLoggedIn(): boolean{
    return this.getRoles().length!=0 && this.getToken().length!=0;
  }
}
