import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserForLogin, UserToRegister } from '../model/user';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
interface User {
  userEmail: string;
  userPassword: string;
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
currentUser:number|null = null;
private base_url = environment.apiUrl;

constructor(private http:HttpClient) { }

authUser(user: UserForLogin): Observable<any> {
  return this.http.post(this.base_url+"/account/login", user).pipe(
    tap((response: any) => {
      this.currentUser = response.id; // Assuming the response contains the user email
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', response.userEmail);
      localStorage.setItem('id',response.id);
    })
  );
}


  addUser(user: UserToRegister){
    return this.http.post(this.base_url + "/account/register",user);
  }


  getCurrentUser(): number | null {
    if (this.currentUser) {
      return this.currentUser;
    }
    return null;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

}


