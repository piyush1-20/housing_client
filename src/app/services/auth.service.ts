import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForLogin, UserToRegister } from '../model/user';
interface User {
  userEmail: string;
  userPassword: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {

constructor(private http:HttpClient) { }

 authUser(user: UserForLogin){

  return this.http.post("http://localhost:5192/api/account/login",user);
    // let UserArray: User[] = [];

    // const usersFromStorage = localStorage.getItem('Users');
    // // console.log(usersFromStorage)
    // if (usersFromStorage) {
    //   UserArray = JSON.parse(usersFromStorage);
    // }
    // // console.log(usersFromStorage)
    // return UserArray.find((p: User) => p.userEmail === user.userEmail && p.userPassword === user.userPassword);
  }


  addUser(user: UserToRegister){
    return this.http.post("http://localhost:5192/api/account/register",user);
    // let users = [];
    // let savedUser =localStorage.getItem('Users');
    // if(savedUser){
    //   users = JSON.parse(savedUser);
    //   users = [user,...users];
    // }else{
    //   users =[user];
    // }
    // localStorage.setItem('Users',JSON.stringify(users))
  }

}


