import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
})
export class PostDetailsComponent implements OnInit {
  public customer: any;
  public squad: any; // Variable to store the squad details
  post: any;
  id: any;
  commentForm!: FormGroup;

  constructor(
    private auth: AuthUserService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private http: HttpClient,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    let token = { token: this.auth.getToken() };
    this.id = this.auth.getId();

    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1)]],
    });

    // Check if user is authenticated
    this.http
      .post(`http://localhost:3000/api/v1/customers/profile`, token)
      .subscribe(
        (res: any) => {
          if (!res.success) {
            this.router.navigate(['Login']);
          }
          this.customer = res.customer;
        },
        (err: any) => {
          console.log(err);
        }
      );

    this.fetchPost();
    this.getSavedPosts();
  }

  truncateText(text: string, maxLength: number = 100): string {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  }

  fetchPost(): void {
    const squadId = this.route.snapshot.paramMap.get('id');
    try {
      // console.log(this.club)
      this.http.get(`http://localhost:3000/api/v1/Posts/${squadId}`).subscribe(
        (res: any) => {
          this.post = res.post;
          console.log(res);
        },
        (err: any) => {
          console.error(err);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }

  downVote(id: any) {
    try {
      this.http
        .patch(`http://localhost:3000/api/v1/posts/${id}/downvote`, {
          id: this.id,
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            this.fetchPost();
          },
          (err: any) => {
            console.log(err);
          }
        );
    } catch (error) {}
  }
  upVote(id: any) {
    try {
      this.http
        .patch(`http://localhost:3000/api/v1/posts/${id}/upvote`, {
          id: this.id,
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            this.fetchPost();
          },
          (err: any) => {
            console.log(err);
          }
        );
    } catch (error) {
      console.log(error);
    }

   
  }

  public navigateToManage(squad: any) {
    this.router.navigate([`/squads/squad-details/${squad._id}`]);
  }

  replyContent: string = '';
  replyToAuthorId: string | null = null;

  replyToComment(comment: any) {
    const taggedUsername = `@${comment.author.firstName}${comment.author.lastName}`;

    this.replyContent = `${this.replyContent} ${taggedUsername} `;
    this.replyToAuthorId = comment.author._id;
  
  }


  cancel(){
    this.replyContent="";
    this.replyToAuthorId="";
  }

  iseditComment = false;
  editingCommentId: any = null; 

  editComment(comment: any) {
    this.iseditComment = true;
    this.editingCommentId = comment._id;
    this.commentForm.patchValue({
      content: comment.content 
    });  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const comment = {
        content: this.commentForm.value.content,
        author: this.customer._id,
        replyTo: this.replyToAuthorId || null,
      };
  
      if (this.iseditComment && this.editingCommentId) {
        // Update comment if in edit mode
        this.http
          .post(
            `http://localhost:3000/api/v1/posts/${this.post._id}/comments/${this.editingCommentId}/edit`,
            comment
          )
          .subscribe(
            (res: any) => {
              console.log(res);
              this.fetchPost(); // Refresh post data
              this.commentForm.reset();
              this.iseditComment = false;
              this.editingCommentId = null;
            },
            (err: any) => {
              console.log(err);
            }
          );
      } else {
        // Create a new comment if not in edit mode
        this.http
          .post(
            `http://localhost:3000/api/v1/posts/${this.post._id}/comment`,
            comment
          )
          .subscribe(
            (res: any) => {
              console.log(res);
              this.fetchPost(); // Refresh post data
              this.commentForm.reset();
            },
            (err: any) => {
              console.log(err);
            }
          );
      }
    }
  }

  public likeComment(id: any) {
    try {
      this.http
        .post(
          `http://localhost:3000/api/v1/posts/${this.post._id}/comments/${id}/like`,
          {
            id: this.id,
          }
        )
        .subscribe(
          (res: any) => {
            console.log(res);
            this.fetchPost();
          },
          (err: any) => {
            console.log(err);
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  deleteComment(comment: any) {
    try {
      this.http
        .delete(
          `http://localhost:3000/api/v1/posts/${this.post._id}/comments/${comment._id}`)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.fetchPost();
          },
          (err: any) => {
            console.log(err);
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  public savePosts(postId: string): void {
    try {

      this.http
        .post(`http://localhost:3000/api/v1/savePosts`, {
          author: this.customer._id,
          post: postId,
        })
        .subscribe((res: any) => {
          console.log('Post saved:', res);
 
          this.getSavedPosts();
          
        });
    } catch (error) {
      console.error('Error saving post:', error);
    }
  }

  _savedPosts:any[] = [];
  toggledSavedStatus:any;

  public getSavedPosts(): void {
    try {
    
      this.http
        .get(`http://localhost:3000/api/v1/savePosts`)
        .subscribe((res: any) => {
          this._savedPosts =  res.data.map((item:any)=>item.post._id);
          
           console.log(this._savedPosts)
        });
    } catch (error) {
      console.error('Error saving post:', error);
    }
  }
  
}
