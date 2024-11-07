import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute to get route parameters
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-club-details',
  templateUrl: './club-details.component.html',
  styleUrls: ['./club-details.component.css'],
})
export class ClubDetailsComponent implements OnInit {
  public customer: any;
  public squad: any; // Variable to store the squad details
  posts: any[] = [];
  id: any;

  constructor(
    private auth: AuthUserService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    let token = { token: this.auth.getToken() };
    this.id = this.auth.getId();

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

    // Fetch single squad details
    this.fetchSingleSquad();

    this.fetchPosts();
  }

  truncateText(text: string, maxLength: number = 100): string {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  }

  fetchPosts(): void {
    try {
      // console.log(this.club)
      this.http.get(`http://localhost:3000/api/v1/posts`).subscribe(
        (res: any) => {
          this.posts = res.posts
            .filter((item: any) => item?.club)

            .filter((item: any) => {
              return item?.club._id == this.squad._id;
            });
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
            this.fetchPosts();
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
            this.fetchPosts();
          },
          (err: any) => {
            console.log(err);
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  // Method to fetch a single squad by ID
  public fetchSingleSquad() {
    // Get the squad ID from the route parameters
    const squadId = this.route.snapshot.paramMap.get('id');

    if (squadId) {
      this.http.get(`http://localhost:3000/api/v1/clubs/${squadId}`).subscribe(
        (res: any) => {
          if (res.success) {
            // console.log(res);

            this.squad = res.club;
            console.log(this.squad);
            // Assign the squad details to the variable
          } else {
            console.error('Failed to fetch squad details');
          }
        },
        (err: any) => {
          console.error('Error fetching squad details:', err);
        }
      );
    } else {
      console.error('No squad ID provided in the route');
    }
  }

  public navigateToPostForm(id: string) {
    this.router.navigate(['/posts/new'], {
      queryParams: { squadID: id, posttype: 'squad' },
    });
  }

  public navigateToManage(squad:any){
    this.router.navigate([`/squads/squad-details/${squad._id}`])
  }
}
