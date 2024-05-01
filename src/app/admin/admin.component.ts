import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { response } from 'express';
import { error } from 'console';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit{

  constructor(private userService: UserService){}

  message = '';

  ngOnInit(): void {
    this.getAdmin();
  }

  getAdmin(){
    this.userService.getAdmin().subscribe(
      (response) => {
        this.message = response;
      }, 
      (error) => {
        console.log(error);
      }
    )
  }
}
