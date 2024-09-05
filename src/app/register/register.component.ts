import { CommonModule } from '@angular/common';
import { NonNullAssert } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';
import { UserToRegister } from '../model/user';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';

@Component({
  imports:[FormsModule,CommonModule,ReactiveFormsModule],
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder,private auth:AuthService,private router:Router,private alertify:AlertifyService) { }

  ngOnInit() {
    // this.registrationForm= new FormGroup({
    //   userName: new FormControl('Jack',Validators.required),
    //   userEmail:new FormControl(null,[Validators.required,Validators.email]),
    //   userPassword:new FormControl(null,[Validators.required,Validators.minLength(8)]),
    //   userConfirmpassword:new FormControl(null,[Validators.required]),
    //   userMobile: new FormControl(null,[Validators.required,Validators.maxLength(10)])
    // })
    this.createRegistrationform()
  }
  createRegistrationform() {
    this.registrationForm =  this.fb.group({
      userName: [null, Validators.required],
      userEmail: [null, [Validators.required, Validators.email]],
      Password: [null, [Validators.required, Validators.minLength(8)]],
      Confirmpassword: [null, Validators.required],
      userMobile: [null, [Validators.maxLength(10)]]
    }, {validators: this.matchPasswordValidator});
  }

  get userEmail(){
    return this.registrationForm.get('userEmail') as FormControl;
  }
  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }

  get Password(){
    return this.registrationForm.get('Password') as FormControl;
  }

  get Confirmpassword(){
    return this.registrationForm.get('Confirmpassword') as FormControl;
  }

  matchPasswordValidator:ValidatorFn =(fg:AbstractControl):ValidationErrors|null=>{{
    return fg.get('Password')?.value===fg.get('Confirmpassword')?.value?null:{notMatched:true};
 }}

 user!: UserToRegister;

 userSubmitted:boolean=false;
    onSubmit(){
      console.log(this.registrationForm.value);
      this.userSubmitted = true;
      const status=this.registrationForm.valid;
        if(status){
          this.auth.addUser(this.registrationForm.value).subscribe(
            ()=>{
              this.onReset();
              this.alertify.success('Congrats, you are successfully registered');
              this.router.navigate(['/login']);
            }
          );

        } else {
            console.error("form is invalid");
        }
    }
    onReset() {
      this.userSubmitted = false;
      this.registrationForm.reset();
    }

}
