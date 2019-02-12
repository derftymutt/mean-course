import { Component, EventEmitter, Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create-component.css']
})
export class PostCreateComponent {

  enteredTitle = '';
  enteredContent = '';

  constructor(private postsService: PostsService) {}

  public onAddPost(form: NgForm) {
    if (!form.invalid ) {
      const post: Post  = {
        id: null,
        title: form.value.title,
        content: form.value.content
      };

      this.postsService.addPost(post);
      form.resetForm();
    }
  }

}
