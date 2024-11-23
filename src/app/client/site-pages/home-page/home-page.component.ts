import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{


  posts: any[]=[];
  id:any;
  public customer: any;


 
  ngOnInit() {
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

  truncateText(text: string, maxLength: number = 100): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
  

  constructor(private http: HttpClient,private router:Router,private auth:AuthUserService) { }


  fetchPosts(): void {
    try {
      // console.log(this.club)
      this.http.get(`http://localhost:3000/api/v1/posts`)
        .subscribe((res: any) => {
          console.log(res);
          this.posts = res.posts;

        }, (err: any) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  }
  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
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

  public navigateToPostDetail(id:any){
    this.router.navigate([`/posts/post/${id}`])
  }

  navigateToProfileDetails(id: any) {
    this.router.navigate([`/profile/${id}`])
  }

  navigetToClubDetails(id: any) {
    this.router.navigate([`/squads/squad/${id}`])
  }
}
