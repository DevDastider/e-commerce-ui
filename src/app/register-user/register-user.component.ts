import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  constructor(private userService:UserService, private router: Router){}

  public registerUser(registerForm: NgForm){
    this.userService.registerUser(registerForm.value).subscribe(
      {
        complete: ()=> this.router.navigate(['/login']),
        error: (e: HttpErrorResponse)=> console.log(e)
      }
    );
  }
}
