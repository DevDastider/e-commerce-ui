import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private user: UserService, 
    private userAuthService: UserAuthService,
    private router: Router){

  }
  
  login(loginForm:NgForm){
    console.log("Form is submitted");
    console.log(loginForm.value)

    this.user.login(loginForm.value).subscribe(
     
      (response: any)=> {
        console.log("response returned");
        console.log(response);
        this.userAuthService.setToken(response.jwtToken);
        this.userAuthService.setRoles(response.user.role);

        const role = response.user.role[0].roleName;
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else{
          this.router.navigate(['/']);
        }
      },
      
      (error)=> {
        console.log(error);
      }
    )
  }

  public registerUser(){
    this.router.navigate(['/register']);
  }
}
