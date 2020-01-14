import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {NgZone} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private db: AngularFirestore, private firebaseAuth: AngularFireAuth, private ngZone: NgZone, private router: Router) { }

  addUserValueToDb(obj) {
    obj.status = 'user';
    this.db.collection('users').add(obj).then(() => {
      console.log('User in DB!');
    }).catch(err => {console.log('Error:', err);
    });
  }

  addUserValueToAuth(obj) {
    this.firebaseAuth.auth.createUserWithEmailAndPassword(obj.email, obj.password).then(() => {
      console.log(obj.email, ': Successfully added!');
    }).catch(err => {console.log('Error:', err);
    });
  }

  userSignInAuth(obj) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(obj.email, obj.password).then(() => {
      console.log(obj.email, ': Successfully gone!');
    }).catch(err => {console.log('Error:', err);
    });
  }

  userLogout() {
    this.firebaseAuth.auth.signOut();
  }

  loggedIn() {
    return this.firebaseAuth.authState;
  }

  loggedInValue() {
    return !!this.firebaseAuth.auth.currentUser;
  }

  currentUserEmail() {
    return this.firebaseAuth.user;
  }

  currentUser(email: any) {
    return this.db.collection('/users', ref => ref.where('email', '==', email)).snapshotChanges();
  }

  navigateToPosts() {
    this.loggedIn().subscribe(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/posts']);
      });
    });
  }



}
