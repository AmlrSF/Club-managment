import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
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
    private fb:FormBuilder
  ) {}

  ngOnInit(): void {
    let token = { token: this.auth.getToken() };
    this.id = this.auth.getId();

    this.commentForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(1)]]
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
  }

  onSubmit(): void {
    if (this.commentForm.valid) {
      const commentContent = this.commentForm.value.content;
      console.log('Comment submitted:', commentContent);
      this.commentForm.reset();  // Clear the form after submission
    }
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
          this.post = res.post
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
        .patch(`http://localhost:3000/api/v1/Post/${id}/downvote`, {
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
        .patch(`http://localhost:3000/api/v1/Post/${id}/upvote`, {
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




  public navigateToManage(squad:any){
    this.router.navigate([`/squads/squad-details/${squad._id}`])
  }
}
