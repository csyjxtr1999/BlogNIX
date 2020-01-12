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
  statusData: string[] = [];
  posts: any = [];
  activeAddPostStatus: boolean;
  currentUser: any;

  /* vars-end */

  constructor(private authService: AuthService, private postService: PostService) { }

  ngOnInit() {
    this.curUserStatus();
    this.getAllPosts();
  }

   curUserStatus() {
     this.authService.currentUserStatus(this.statusData);
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

  currentUserData() {
    this.authService.currentUserData(this.currentUser);
  }

}
