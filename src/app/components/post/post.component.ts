import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PostService} from '../../services/post.service';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  posts: any = [];
  currentPostObs: any;
  currentPost: any;

  constructor(private authService: AuthService, private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getHero();
  }

  getHero() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getAllPosts().subscribe(posts => {
      // @ts-ignore
      this.currentPostObs = of(posts.find(post => post.key === id));
      this.currentPostObs.subscribe(post => {
        this.currentPost = post;
        console.log(this.currentPost);
      });
    });
  }
}
