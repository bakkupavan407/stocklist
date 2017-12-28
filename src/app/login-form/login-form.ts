import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, FormsModule, FormControl, Validators , ReactiveFormsModule} from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css']
})
export class LogInComponent implements OnInit {
  public user: any;
  public username: string;
  public password: string;
  public error: string;
  loginForm : FormGroup;
  promiseSetBySomeAction;

	constructor(private router: Router, private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { 
    this.user = {};
    this.error = '';
		this.router = router;
	}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

   isFieldValid(field: string) {
      return !this.loginForm.get(field).valid && this.loginForm.get(field).touched;
    }

    displayFieldCss(field: string) {
      return {
        'has-error': this.isFieldValid(field),
        'has-feedback': this.isFieldValid(field)
      };
    }

    validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  //  (click)="btnClickLogin($event.target, 'Logging In ...')"
  // public makeDefaultBtn(element) {
  //   element.textContent = "Login";
  //   element.disabled = false;
  // }

	public btnClickLogin():void {
    if(this.loginForm.valid) {

      this.username = this.user.email;
      this.password = this.user.password;

      this.authenticationService.login(this.username, this.password)
            .subscribe(result => {
                if (result) {
                    this.user = {};
                    if(result.role === "user") {
                      this.router.navigate(['/dashboard']);
                    } else if(result.role === "admin") {
                      this.router.navigate(['/home']);
                    }
                } else {
                  this.error = "Please login with valid details.";
                }
            });
    } else {
      this.validateAllFormFields(this.loginForm);
    }

	}
}
