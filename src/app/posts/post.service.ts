import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

constructor(private http: HttpClient) {

}

getPosts() {
this.http.get<{message: string, posts: Post[]}>('htpp://localhost:3000/api/posts')
.subscribe((postData) => {
this.posts = postData.posts;
this.postsUpdated.next([...this.posts]);
});

}

getPostUpdateListener() {

  return this.postsUpdated.asObservable();

}

addPost(title: string, content: string) {
const post: Post = {id: null, title, content};
this.posts.push(post);
this.postsUpdated.next([...this.posts]);
}

}
