import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { user_url } from '../url';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registForm: FormGroup;

  password: FormControl;

  equalVaildator(group: FormGroup): any {
    const password = group.get('password') as FormControl;
    const confirpwd = group.get('confirpwd') as FormControl;

    const isEqule: boolean = (password.value === confirpwd.value);
    return isEqule ? null : {equal: {info: '密码不一致'}};
  }

  emailVaildator(control: FormControl): any {

    const emailExp = /^([a-zA-z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    const result = emailExp.test(control.value);

    return result ? null : {
      info: '请输入正确的邮箱'
    }

  }



  query: any = {
    username: '',
    password: '',
    email: ''

  }
  options;

  URL: string = 'http://localhost:81/user/register';


  constructor(private http: HttpClient, private fb: FormBuilder) {
    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    });
    this.options = {
      headers: headers,
      responseType: 'text'
    };

    

    this.registForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      passwordGroup: this.fb.group({
        password: ['', Validators.minLength(6)],
        confirpwd: ['']
      }, {validator: this.equalVaildator}),
      email: ['', {validator: this.emailVaildator}]
    });
    
   }

  ngOnInit() {
  }

  register(): void {
    this.http.post(user_url + 'user/register', this.query, this.options)
    .subscribe(data => console.log(data));
    console.log(this.query);
  }

}
