import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private db: AngularFirestore, private location: Location) { }

  addPostToDb(post) {
    this.db.collection('posts').add(post);
  }

  getAllPosts() {
    return this.db.collection('posts').snapshotChanges().pipe(map(posts => {
      return posts.map(c => ({key: c.payload.newIndex, ...c.payload.doc.data()}));
    }));
  }

  back() {
    this.location.back();
  }

}
