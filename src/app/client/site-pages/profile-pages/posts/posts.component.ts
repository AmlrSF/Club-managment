import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit{
  posts: any[] = [];
  id:any;
  customer: any;

  truncateText(text: string, maxLength: number = 100): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  

  constructor(private http: HttpClient,private router:Router,private auth:AuthUserService) { }



  ngOnInit(): void {
    let token = {
      token: this.auth.getToken()
    };

    console.log(token);

    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`, token).subscribe(
        (res: any) => {
          if (!res.success) {
            this.router.navigate(["Login"]);
          }

     ;

          this.customer = res.customer;

       
        }, (err: any) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
    // Simulate fetching data from an API or other source
    this.id = this.auth.getId();
    this.fetchPosts();
    
  }

  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }


  public navigateToPostDetail(id:any){
    this.router.navigate([`/posts/post/${id}`])
  }

  fetchPosts(): void {
    try {
      // console.log(this.club)
      this.http.get(`http://localhost:3000/api/v1/posts`)
        .subscribe((res: any) => {
          console.log(res);
          this.posts = res.posts.filter((item:any)=>item.author._id == this.customer._id);

        }, (err: any) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  }

  downVote(id:any) {
    try {
      this.http.patch(`http://localhost:3000/api/v1/posts/${id}/downvote`,{id:this.id})
      .subscribe((res: any) => {
        console.log(res);
        this.fetchPosts();
      }, (err: any) => {
        console.log(err)
      })
    } catch (error) {
      
    }
  }
  upVote(id:any) {
    try {
      this.http.patch(`http://localhost:3000/api/v1/posts/${id}/upvote`,{id:this.id})
      .subscribe((res: any) => {
        console.log(res);
        this.fetchPosts();
      }, (err: any) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error);
      
    }
  }

}
