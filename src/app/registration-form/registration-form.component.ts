import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

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

	constructor(private authenticationService: AuthenticationService) { 
		this.user = {};
	}

	ngOnInit() {
	}

	public btnClickRegister(): void{
		this.pwd = this.user.password;
		this.cpwd = this.user.cnfmpassword;

		if(this.pwd === this.cpwd) {
			delete this.user.cnfmpassword;
			this.authenticationService.register(this.user)
             .subscribe(result => {
             	if(result) {
             		console.log(result);
             		this.showSuccMsg = "Your registration was successfull!";
             	} else {
             		this.showErrorMsg = "Something wrong with the server connection. Please try again after sometime.";
             	}
                this.user = {};
            });
		} else {
			console.log("Password mismatch");
		}
	}

	public btnClickRegisterCancel(): void {
		this.user = {};
	}

}
