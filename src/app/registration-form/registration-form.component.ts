import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { FormBuilder, FormGroup, FormsModule, FormControl, Validators , ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
	public user: any;
	private pwd: string;
	private cpwd: string;
	public showSuccMsg: string = "";
	public showErrorMsg: string = "";
	registerForm : FormGroup;

	constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) { 
		this.user = {};
	}

	ngOnInit() {
		this.registerForm = this.formBuilder.group({
			username: [null, Validators.required],
			email: [null, Validators.required],
			password: [null, Validators.required],
			cnfmpassword: [null],
			mobile: [null]
	    });
	}

	isFieldValid(field: string) {
      return !this.registerForm.get(field).valid && this.registerForm.get(field).touched;
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

	public btnClickRegister(): void{
		if(this.registerForm.valid) {
			if(this.user.password === this.user.cnfmpassword) {
				delete this.user.cnfmpassword;
				this.authenticationService.register(this.user)
	             	.subscribe(result => {
		             	if(result) {
		             		this.showSuccMsg = "Your registration was successfull!";
		             	} else {
		             		this.showErrorMsg = "Something wrong with the server. Please try again after sometime.";
		             	}
		                this.user = {};
	            });
			} else {
				this.showErrorMsg = "Password must match.";
			}
	    } else {
	      this.validateAllFormFields(this.registerForm);
	    }
	}

	public btnClickRegisterCancel(): void {
		this.user = {};
	}

}
