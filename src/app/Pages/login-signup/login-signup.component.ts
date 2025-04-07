import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-signup',
  imports: [FormsModule, CommonModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.css'
})
export class LoginSignupComponent {
  activeForm:"login"|"register"="login";
  registerObj:registerModel=new registerModel();
  loginObj:loginModel=new loginModel();

  constructor(private _snackbar: MatSnackBar, private _router: Router) {}
    toggleForm(form:'login'|'register') {
    this.activeForm=form;
  }

  registerForm() {
    if (!this.registerObj.name||!this.registerObj.email||!this.registerObj.password) {
      this._snackbar.open("All fields are required!","Close",{duration:3000});
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(this.registerObj.email)) {
      this._snackbar.open("Invalid email! Use '@gmail.com' format.", "Close", { duration:3000 });
      return;
    }

    const localUsers=localStorage.getItem('users');
    let users=localUsers?JSON.parse(localUsers):[];
    users.push(this.registerObj);
    localStorage.setItem('users',JSON.stringify(users));

    this._snackbar.open("User registered successfully!","Close",{duration:3000});

    this.toggleForm('login');
  }

  loginForm() {
    if (!this.loginObj.email||!this.loginObj.password) {
      this._snackbar.open("All fields are required!", "Close", { duration:3000 });
      return;
    }

    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(this.loginObj.email)) {
      this._snackbar.open("Invalid email! Use '@gmail.com' format.", "Close", { duration:3000 });
      return;
    }

    const localUsers=localStorage.getItem("users");
    if (localUsers){
      const users=JSON.parse(localUsers);
      const userExists=users.find(
        (user:registerModel)=>user.email===this.loginObj.email && user.password===this.loginObj.password
      );

      if (userExists){
        this._snackbar.open("Login successful!","Close",{duration:3000 });
        this._router.navigateByUrl("/Pages/dashboard");
      } else {
        this._snackbar.open("Email or password is incorrect!","Close",{duration:3000 });
      }
    } 
    else {
      this._snackbar.open("No registered users found.","Close", { duration:3000 });
    }
  }
}

export class registerModel {
  name:string;
  email:string;
  password:string;

  constructor() {
    this.name="";
    this.email="";
    this.password="";
  }
}

export class loginModel {
  email:string;
  password:string;

  constructor() {
    this.email="";
    this.password="";
  }
}
