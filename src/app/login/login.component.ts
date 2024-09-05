import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserForLogin } from '../model/user';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  standalone: true,
  imports:[FormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUser:string='';
  constructor(private authService:AuthService,private router:Router,private alertify: AlertifyService) { }

  ngOnInit() {
  }
  
  onLogin(loginForm: NgForm) {
    this.authService.authUser(loginForm.value).subscribe(
      (response: Partial<UserForLogin>) => {
        console.log(response);
        if (response.token && response.userEmail) {
          this.alertify.success("Login Successful");
          this.router.navigate(['/']);
        }
      },
      error => {
        this.alertify.error("Login Failed");
      }
    );
  }

}
