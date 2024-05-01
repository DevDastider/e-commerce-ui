import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  
  constructor(private userService: UserService){}

  message = '';

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this.userService.getUser().subscribe(
      (response) => {
        console.log(response);
        this.message = response;        
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
