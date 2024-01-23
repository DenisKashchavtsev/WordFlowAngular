import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";
import {User} from "../../models/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  public user$: Observable<User>;
  constructor(private _authService: AuthService) {
    this.user$ = this._authService.getCurrentUser();
  }
}
