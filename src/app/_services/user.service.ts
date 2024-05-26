import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  HOST_SERVER_PATH = "http://localhost:8080";
  
  noAuthHeader = new HttpHeaders(
    { "No-Auth" : "True" }
  );
  
  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) { }
  
  /**
   * This method will login with the username & password provided by user
   * 
   * @param loginData 
   * @returns 
   */
  public login(loginData:any) {
    return this.httpClient.post(this.HOST_SERVER_PATH + "/authenticate", loginData, { headers: this.noAuthHeader })
  }

  public registerUser(registerData: any){
    return this.httpClient.post(this.HOST_SERVER_PATH + "/registerNewUser", registerData);
  }

  /**
   * This method will match roles between a role of user and role required to visit a page
   * 
   * @param allowedRole 
   * @returns 
   */
  public matchRole(allowedRole:string[]): boolean{
    let isMatch = false;
    const userRole: any = this.userAuthService.getRoles();
    console.log('user role='+ userRole);
    
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

  /**
   * This method will invoke GET user endpoint
   * 
   * @returns 
   */
  public getUser(){
    return this.httpClient.get(this.HOST_SERVER_PATH + '/forUser', {
      responseType: 'text'
    })
  }

  /**
   * This method will invoke GET admin endpoint
   * 
   * @returns 
   */
  public getAdmin(){
    return this.httpClient.get(this.HOST_SERVER_PATH + '/forAdmin', {
      responseType: 'text'
    })
  }
}
