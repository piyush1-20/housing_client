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

  constructor(private authService:AuthService,private router:Router,private alertify: AlertifyService) { }

  ngOnInit() {
  }
  onLogin(loginForm:NgForm){
    console.log("login clicked")
    // console.log(loginForm.value)

    this.authService.authUser(loginForm.value).subscribe(
      (response: Partial<UserForLogin>) => {
        // console.log(response);
        const user = response;
        const tk = response.token || "default-token";
        const mail = response.userEmail || "default-mail";
        if(tk != "default-token" && mail!="default-mail"){
          // console.log(user);
          localStorage.setItem('token',tk);
          localStorage.setItem('email',mail);
          this.alertify.success("Login Successful");
          this.router.navigate(['/']);
        }
      }

    );
  }

}
