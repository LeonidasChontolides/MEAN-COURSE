import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';


export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

constructor(private http: HttpClient) {

}

getPosts() {
this.http.get<{message: string, posts: any }>('//localhost:3000/api/posts'
) .pipe(map((postData) => {
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

addPost(title: string, content: string) {
const post: Post = {id: null, title, content};
this.http.post<{message: string, }>('//localhost:3000/api/posts', post)
.subscribe((responseData) =>{
  console.log(responseData.message);
  this.posts.push(post);
  this.postsUpdated.next([...this.posts]);
});

}

}
