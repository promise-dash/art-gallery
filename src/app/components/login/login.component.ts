import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
  
      const userString = localStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
  
      if (user && email === user.email && password === user.password) {
        this.api.isUserLoggedIn = true;
        console.log('Login successful');
        this.router.navigate(['/']);
      } else {
        console.log('Invalid email or password');
      }
    }
  }
}
