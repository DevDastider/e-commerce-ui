import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  HOST_SERVER_PATH = "http://localhost:8080";
  
  requestHeader = new HttpHeaders(
    { "No-Auth" : "True" }
  );
  
  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) { }
  
  public login(loginData:any) {
    return this.httpClient.post(this.HOST_SERVER_PATH + "/authenticate", loginData, { headers: this.requestHeader })
  }

  public matchRole(allowedRole:string[]): boolean{
    let isMatch = false;
    const userRole: any = this.userAuthService.getRoles();

    if (userRole.length != 0) {
      for(let i=0; i<userRole.length; i++){
        for(let j=0; j<userRole.length; j++){
          if (userRole[i].roleName === allowedRole[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}
