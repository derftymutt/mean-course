import { Post } from './post.model';

export class PostsService {
   private posts: Post[] = [];

   getPosts() {
     return [...this.posts];
   }

   addPost(post: Post) {
     this.posts.push(post);
   }
}
