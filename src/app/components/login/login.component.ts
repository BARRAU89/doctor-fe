import { UiService } from './../../services/ui.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username = '' //this are storing the value of the username from the input (html)
  public password = '' //they are undefined and created as empty string, so when the program runs, they will be empty. 

 constructor(public ui:UiService) {}

 ngOnInit(): void {}
}
