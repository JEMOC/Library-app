import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { user_url } from '../url';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  query: any = {
    username: '',
    password: '',
    email: ''

  }
  options;

  URL: string = 'http://localhost:81/user/register';


  constructor(private http: HttpClient) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    });
    this.options = {
      headers: headers,
      responseType: 'text'
    };
   }

  ngOnInit() {
  }

  register(): void {
    this.http.post(user_url + 'user/register', this.query, this.options)
    .subscribe(data => console.log(data));
    console.log(this.query);
  }

}
