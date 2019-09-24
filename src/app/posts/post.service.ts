import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostCreateComponent } from './post-create/post-create.component';


export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

constructor(private http: HttpClient, private router: Router) {
}

getPosts() {
this.http.get<{message: string, posts: any }>('//localhost:3000/api/posts'
).pipe(map((postData) => {
return postData.posts.map(post => {
  return {
    title: post.title,
    content: post.content,
    id: post._id,
    imagePath: post.imagePath
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

getPost(id: string) {
return this.http.get<{_id: string, title: string, content: string, imagePath: string}>
('//localhost:3000/api/posts/' + id);
}

addPost(title: string, content: string, image: File) {
// const post: Post = {id: null, title, content};
const postData = new FormData();
postData.append('title', title);
postData.append('content', content);
postData.append('image', image, title);
this.http.post<{message: string, post: Post }>('//localhost:3000/api/posts', postData)
.subscribe((responseData) => {
  const id = responseData.post.id;
  const post: Post = {
    id: responseData.post.id,
    title,
    content,
    imagePath: responseData.post.imagePath
  };
  post.id = id;
  this.posts.push(post);
  this.postsUpdated.next([...this.posts]);
  this.routerNavigate();
});
}

deletePost(postId: string) {
  this.http.delete('//localhost:3000/api/posts/' + postId)
  .subscribe(() => {
  const updatedPosts = this.posts.filter(post => post.id !== postId);
  this.posts = updatedPosts;
  this.postsUpdated.next([...this.posts]);
  });
}

updatePost(id: string, title: string, content: string, image: File | string) {
  let postData: Post | FormData;
  if (typeof(image) === 'object') {
    postData = new FormData();
    postData.append('id' , id);
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image' , image , title);
  } else {
    postData = {id, title, content, imagePath: image};
  }

  this.http.put('//localhost:3000/api/posts/' + id , postData)
  .subscribe(response => {
const updatedPosts = [...this.posts];
const oldPostIndex = updatedPosts.findIndex(p => p.id === id);
const post: Post = {id, title, content, imagePath: ''};
updatedPosts[oldPostIndex] = post;
this.posts = updatedPosts;
this.postsUpdated.next([...this.posts]);
this.routerNavigate();
this.router.navigate(['/']);
  });
}

routerNavigate() {
  this.router.navigate(['/']);
}

}
