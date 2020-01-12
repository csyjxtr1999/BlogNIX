import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PostService} from '../../../services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postData: FormGroup;
  constructor(private postService: PostService) {
    this.postData = new FormGroup({
      postImage: new FormControl('', Validators.required),
      postTitle: new FormControl('', Validators.required),
      postContent: new FormControl('', Validators.required)
    });
  }
  @Output() closeActive: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  submit(event) {
    event.preventDefault();
    this.postService.addPostToDb(this.postData.value);
  }

  closeAddPost() {
    this.closeActive.emit();
    this.postData.reset();
  }

}
