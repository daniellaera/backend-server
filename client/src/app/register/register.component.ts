import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    const intervals$ = interval(1000);
    intervals$.subscribe(val => console.log('stream 1 =>' + val));
    intervals$.subscribe(val => console.log('stream 2 =>' + val));
  }

  register() {
    this.auth.register(this.credentials).subscribe(() => { }, (err) => {
      console.log(err);
    });
  }

}
