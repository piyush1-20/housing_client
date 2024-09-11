import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HousingService } from '../services/housing.service';
import { AuthService } from '../services/auth.service';

@Component({
  standalone:true,
  imports:[RouterLink,CommonModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedInUser: string = "null";

  constructor(private router:Router,
    private auth:AuthService
  ) { }

  ngOnInit() {
  }
  loggedin(){
    const p = localStorage.getItem('email');
    if(p){
      this.loggedInUser = p.split('@')[0];
    }
    return localStorage.getItem('token');
  }
  onLogout(){
    this.auth.logout();
  }

}
