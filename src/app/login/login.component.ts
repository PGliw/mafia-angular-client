import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, FormGroupDirective, NgForm, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

// ts
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, _form: FormGroupDirective | NgForm | null): boolean {
    return control.touched && control.invalid;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        login: [null, [Validators.required]],
        password: [null, [Validators.required]]
      }
    );
  }

  signIn() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.authService.signIn({
        login: this.form.controls.login.value,
        password: this.form.controls.password.value
      }).subscribe(isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['dashboard']);
        }
      });
    }
  }

}
