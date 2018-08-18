import {
  Component,
  OnInit
} from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import {
  user_url
} from '../url';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registForm: FormGroup;



  passwordGroup: FormGroup;

  username;
  password;
  confirpwd;
  email;




  equalVaildator(group: FormGroup): any {
    const password = group.get('password') as FormControl;
    const confirpwd = group.get('confirpwd') as FormControl;

    const isEqule: boolean = (password.value === confirpwd.value);
    return isEqule ? null : {
      equal: {
        info: '密码不一致'
      }
    };
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

    this.passwordGroup = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirpwd: ['', Validators.required]
    }, {
      validator: this.equalVaildator
    })

    this.registForm = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(6)]],
        passwordGroup: this.passwordGroup,
        email: ['', [Validators.required, Validators.email]]
        });

      this.username = this.registForm.get('username'); this.password = this.passwordGroup.get('password'); this.confirpwd = this.passwordGroup.get('confirpwd'); this.email = this.registForm.get('email')

    }

    ngOnInit() {}

    register(): void {
      if (this.registForm.valid) {
        const query = {
          username: this.username.value,
          password: this.password.value,
          email: this.email.value
        }
        this.http.post(user_url + 'user/register', query, this.options)
          .subscribe(data => console.log(data));
        this.log(query);
      } else {
        alert('disable');
      }
    }

    log(obj) {
      console.log(obj);
    }

  }
