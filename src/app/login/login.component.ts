import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submitForm() {
    const reqBody = {
      email: this.email?.value,
      password: this.password?.value,
    };

    this.auth.login(reqBody).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('name', JSON.stringify(res.user.name));
      },
      error: (err) => {
        console.log(err.error);
        this.error = err.error.reason;
      },
      complete: () => {
        console.log(this.cookieService.check('connect.sid'));
        this.error = '';
        this.auth.emitLoginChange(this.cookieService.check('connect.sid'));
        this.router.navigateByUrl('/home');
      },
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
