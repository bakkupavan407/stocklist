import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LogInComponent {
  private user: any;
  private username: string;
  private password: string;
  private error: string;

	constructor(private router: Router, private authenticationService: AuthenticationService) { 
    this.user = {};
    this.error = '';
		this.router = router;
    localStorage.removeItem('currentUser');
	}

	private btnClickLogin():void {
    this.username = this.user.username;
    this.password = this.user.password;

    if(this.username && this.password) {
      this.authenticationService.login(this.username, this.password)
            .subscribe(result => {
                if (result === true) {
                    this.user = {};
                    this.router.navigate(['/home']);
                } else {
                    this.error = "Username or password is incorrect";
                }
            });
    } else {
      this.error = "Username and Password are required!";
    }

	}
}
