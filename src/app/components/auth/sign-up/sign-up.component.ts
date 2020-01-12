import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  /* vars */

  userProfile: FormGroup;

  /* vars-end */

  constructor(private authService: AuthService) {
    this.userProfile = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
  }


  submit(event) {
    event.preventDefault();
    if (this.userProfile.valid) {
      this.authService.addUserValueToDb(this.userProfile.value);
      this.authService.addUserValueToAuth(this.userProfile.value);
      this.authService.navigateToPosts();
    } else {
      console.log('Please, enter valid data');
    }
  }
}
