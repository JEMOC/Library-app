import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient, HttpHeaders, HttpParams
} from '@angular/common/http';
import {
  map
} from 'rxjs/operators';
import {
  Observable,
  of
} from 'rxjs';
import {
  url
} from '../url';

import { user_url } from '../url';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  shadectl = false;
  options;
  query = {
    username : '',
    password : ''
  };


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

  showshade() {
    this.shadectl = true;
    document.querySelector('html').style.overflow = 'hidden';
  }

  closeshade() {
    this.shadectl = false;
    document.querySelector('html').style.overflow = 'auto';
  }



  login() {
    this.http.post(user_url + 'user/login', this.query, this.options )
      .subscribe(data => console.log(data));
    console.log(this.query.username);
  }
}
