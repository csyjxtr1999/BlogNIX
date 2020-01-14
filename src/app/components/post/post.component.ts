import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PostService} from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  /* vars */

  posts: any = [];
  currentPostObs: any;
  currentPost: any;
  postChangeValue: FormGroup;

  /* vars-end */

  constructor(private authService: AuthService, private postService: PostService, private route: ActivatedRoute) {
    this.postChangeValue = new FormGroup({
      postImage: new FormControl('', ),
      postTitle: new FormControl(''),
      postContent: new FormControl(''),
    });

  }

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getAllPosts().subscribe(posts => {
      // @ts-ignore
      this.currentPostObs = of(posts.find(post => post.key === id));
      this.currentPostObs.subscribe(post => {
        this.currentPost = post;
      });
    });
  }

  backToPosts() {
    this.postService.back();
  }

}
