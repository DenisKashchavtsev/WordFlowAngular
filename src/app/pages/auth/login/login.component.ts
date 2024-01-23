import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.loginForm = fb.group({
      'email': new FormControl('test@gmail.com'),
      'password': new FormControl('1234')
    });
  }

  submit(): void {
    const { email, password } = this.loginForm.value;

    this._authService.login(email, password).subscribe(response => {
      if (response.token) {
        this._authService.setToken(response.token)
        this._authService.setRefreshToken(response.refreshToken)

        this._router.navigate(['/dashboard'])
      }
    })
  }
}
