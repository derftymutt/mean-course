import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class PostsService {
   private posts: Post[] = [];
   private postsUpdated = new Subject<Post[]>();

   constructor(private http: HttpClient) {}

   getPosts() {
     this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts')
      .pipe(map((postData: any) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
   }

   getPostUpdateListener() {
     return this.postsUpdated.asObservable();
   }

   addPost(post: Post) {
     this.http.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe(response => {
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
   }
}
