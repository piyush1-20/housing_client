import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  standalone:true,
  imports:[RouterLink,CommonModule],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedInUser: string = "null";

  constructor(private router:Router) { }

  ngOnInit() {
  }
  loggedin(){
    const p = localStorage.getItem('email');
    if(p){
      this.loggedInUser = p;
    }
    return localStorage.getItem('token');
  }
  onLogout(){
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.router.navigate(['/login']);
  }

}
