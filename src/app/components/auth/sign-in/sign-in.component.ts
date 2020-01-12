import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';

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
    this.activeUser = this.authService.loggedIn();
    // this.currentUserData();
  }

  submit(event) {
    event.preventDefault();
    this.authService.userSignInAuth(this.userProfile.value);
    this.authService.navigateToPosts();
  }

// currentUserData() {
//     this.authService.currentUserData(this.currentUser);
// }

}
