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
  
  constructor(
    private auth: AuthUserService,
    private router: Router,
    private route: ActivatedRoute, // Inject ActivatedRoute
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    let token = { token: this.auth.getToken() };

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
  }

  // Method to fetch a single squad by ID
  public fetchSingleSquad() {
    // Get the squad ID from the route parameters
    const squadId = this.route.snapshot.paramMap.get('id');

    if (squadId) {
      this.http
        .get(`http://localhost:3000/api/v1/clubs/${squadId}`)
        .subscribe(
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
      queryParams: { squadID: id, posttype: 'squad' }
    });
  }
  
}
