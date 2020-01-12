import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

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

  getUsersList() {
    return this.db.collection('users').snapshotChanges().pipe(map(item => {
      return item.map(c => ({key: c.payload.newIndex, ...c.payload.doc.data()}));
    }));
  }

   currentUserStatus(data) {
    this.getUsersList().subscribe(users => {
      users.map(user => {
        const currentEmail = this.firebaseAuth.auth.currentUser.providerData.map(item => {
          return item.email;
        });
        // @ts-ignore
        if (user.email === currentEmail[0]) {
          // @ts-ignore
          data.push(user.status);
        }
      });
    });
  }

  currentUserData(data) {
    this.getUsersList().subscribe(users => {
      users.map(user => {
        const currentUser = this.currentUser();
        // @ts-ignore
        if (user.email === currentUser[0].email) {
          // @ts-ignore
          data = user;
          console.log(data);
        }
      });
    });
  }

  currentUser() {
    return this.firebaseAuth.auth.currentUser.providerData.map(item => {
      return item;
    });
  }

  navigateToPosts() {
    return this.firebaseAuth.authState.subscribe(() => {
      return this.ngZone.run(() => {
        this.router.navigate(['/posts']);
      });
    });
  }

  loggedIn() {
    return !!this.firebaseAuth.auth.currentUser;
  }

}
