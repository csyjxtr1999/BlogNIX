import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  /* vars */

  userProfile: FormGroup;
  activeUser: boolean;
  currentUser: any;

  /* vars-end */

  constructor(private authService: AuthService) {
    this.userProfile = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnInit() {
    this.loggedInMain();
    this.getCurrentUser();
  }

  loggedInMain() {
  this.authService.loggedIn().subscribe(user => {
      user !== null ? this.activeUser = true : this.activeUser = false;
    });
  }

  submit(event) {
    event.preventDefault();
    if (this.userProfile.valid) {
      this.authService.userLogout();
      this.authService.userSignInAuth(this.userProfile.value);
      this.authService.navigateToPosts();
    } else {
      console.log('Please, enter valid data');
    }
  }

  getCurrentUser() {
    this.authService.currentUserEmail().subscribe(item => {
      item.providerData.forEach(value => {
        this.currentUserData(value);
      });
    });
  }
  currentUserData(value) {
    this.authService.currentUser(value.email).subscribe(user => {
      user.forEach(userData => {
        this.currentUser = userData.payload.doc.data();
        console.log(this.currentUser);
      });
    });
  }

  userLogout() {
    this.authService.userLogout();
  }
}
