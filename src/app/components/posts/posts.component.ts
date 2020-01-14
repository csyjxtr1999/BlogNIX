import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PostService} from '../../services/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  /* vars */

  users: any = [];
  posts: any = [];
  currentUser: any;
  statusData: string;
  activeAddPostStatus: boolean;

  /* vars-end */

  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getAllPosts();
  }

  getCurrentUser() {
    this.authService.currentUserEmail().subscribe(item => {
      item.providerData.forEach(value => {
        this.currentUserStatus(value);
      });
    });
  }
  currentUserStatus(value) {
    this.authService.currentUser(value.email).subscribe(user => {
      user.forEach(userData => {
        this.currentUser = userData.payload.doc.data();
        this.statusData = this.currentUser.status;
      });
    });
  }

  getAllPosts() {
    this.postService.getAllPosts().subscribe(posts => {
      posts.map((post, index) => {
        this.posts[index] = post;
      });
    });
  }

  activeAddPost() {
    this.activeAddPostStatus = true;
  }

  closeAddPost() {
    this.activeAddPostStatus = false;
  }

}
