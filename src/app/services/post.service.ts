import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private db: AngularFirestore) { }

  addPostToDb(post) {
    this.db.collection('posts').add(post);
  }

  getAllPosts() {
    return this.db.collection('posts').snapshotChanges().pipe(map(posts => {
      return posts.map(c => ({key: c.payload.newIndex, ...c.payload.doc.data()}));
    }));
  }

}
