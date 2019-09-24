import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { mimeType } from './mime-type.validator';

@Component ({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
enteredTitle = '';
enteredContent = '';
post: Post;
isLoading = false;
form: FormGroup;
imagePreview: string;
private mode = 'create';
private postId: string;

constructor(public postsService: PostsService, public route: ActivatedRoute) {}

ngOnInit() {
  this.form = new FormGroup({
    // FormControl() creates a single control in the form and takes a couple of
    // arguments.
    // The first argument is the beggining form state.
    // The next argument allow us to attach validators or in general form control options.
    // Such options would be a javascript object and in that object we can define things like asyncValidators,
    // which are validators that take a time to finish, validators which are synchronous validators , etc..
  title: new FormControl(null,
    {validators: [Validators.required, Validators.minLength(3)]
    }),
  content: new FormControl(null,
    {validators: [Validators.required]
    }),
  image: new FormControl(null, {
    validators: [Validators.required],
    asyncValidators: [mimeType]
    })
  });
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
  if (paramMap.has('postId')) {
  this.mode = 'edit';
  this.postId = paramMap.get('postId');
  this.isLoading = true;
  this.postsService.getPost(this.postId).subscribe(postData => {
  this.isLoading = false;
  this.post = {id: postData._id, title: postData.title, content: postData.content, imagePath: postData.imagePath};
  this.form.setValue({title: this.post.title, content: this.post.content, image: this.post.imagePath});
  });
} else {
  this.mode = 'create';
  this.postId = null;
}
});
}

onImagePicked(event: Event) {
const file = (event.target as HTMLInputElement).files[0];
this.form.patchValue({image: file});
this.form.get('image').updateValueAndValidity();
// A data URL must be created to preview the image
const reader = new FileReader();
reader.onload = () => {
this.imagePreview = reader.result as string;
};
reader.readAsDataURL(file);
}

onSavePost() {
  if (this.form.invalid) {
    return;
  }
  this.isLoading = true;
  if (this.mode === 'create') {
    this.postsService.addPost(this.form.value.title, this.form.value.content, this.form.value.image);
  } else {
    this.postsService.updatePost(
      this.postId,
      this.form.value.title,
      this.form.value.content,
      this.form.value.image
      );
    }
  this.form.reset();
  }
}

