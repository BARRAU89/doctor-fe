import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from 'src/User';
import { take } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showRegister = false;
  private showLogin = true;
  private loading = false;
  private userId: number | undefined;
  private username: string | undefined;
  private doctor = false
  private appointments = []


  constructor(private http: HttpClient,
    private snackBar: MatSnackBar) { }

  public getshowRegister(): boolean {
    return this.showRegister;
  }

  public getshowLogin(): boolean {
    return this.showLogin;
  }

  public getLoading(): boolean {
    return this.loading;
  }

  public getUsername(): string | undefined {
    return this.username;
  }

  public startRegister(): void {
    this.showLogin = false;
    this.showRegister = true;
  }

  public startLogin(): void {
    this.showLogin = true;
    this.showRegister = false;
  }
  
  private loginSuccess(user: User):void{
    this.showLogin = false; //if login success, we dont want to show the login page.
    this.showRegister = false; // if login success, we dont want to show the register page. and will show other page.  Therefore, other components are needed. 
    this.userId = user.id;
    this.username = user.username;
    this.doctor = user.doctor

  }

  public tryLogin(username:string, password:string): void  { //this method use http because connects to the backend server.  That's the http is called in the contructor
    this.http.get<User []>(`http://localhost:3000/users?username=${username}&password=${password}`) //we are using get here because we want to check if the username and password matches, we are waiting a User array in response. 
    .pipe(take(1))
    .subscribe({
      next: users => {
        if (users.length !== 1) {     //!==1 it's because there should be only one user that matches in the array. If no user or more than one, there is an error. 
          this.snackBar.open('Invalid Username and/or Password.', undefined, {
            duration: 2000,
          });
          return 
        }

        this.loginSuccess(users[0]) //this is the positive case of login success.  Due to there should be only one user, the array should contain only one user.  Therefore, we call poisition 0 of the array. 
      },
      error: err => {
        this.snackBar.open('Ooops, something went wrong.', undefined, {duration: 2000})
      }
    })
  }

  public logout(): void { //wecopy everything from the class declaration, to reset the values to original when logged out
    this.showRegister = false;
    this.showLogin = true;
    this.loading = false;
    this.userId = undefined;
    this.username = undefined;
    this.doctor = false
  }





}
