import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

interface Interest {
  id: string;
  name: string;
}

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.css'],
})
export class InterestComponent implements OnInit {
  interests: any[] = [];
  selectedInterests: Interest[] = [];
  profileId: any;
  private url = 'http://localhost:3000/api/v1/customers/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthUserService
  ) {}

  ngOnInit(): void {
    let token = {
      token: this.auth.getToken(),
    };

    console.log(token);

    try {
      this.http
        .post(`http://localhost:3000/api/v1/customers/profile`, token)
        .subscribe(
          (res: any) => {
            if (res.success == true) {
              this.profileId = res.customer._id;
              if (
                res.customer.Identificated &&
                res.customer.interests.length > 0
              ) {
                this.router.navigate(['/']);
              }
              console.log(this.profileId);
            }
          },
          (err: any) => {
            console.log(err);
          }
        );
    } catch (error) {}
    this.getInterests();
  }

  getInterests(): void {
    this.http.get<any[]>('http://localhost:3000/api/v1/interests').subscribe(
      (response) => {
        this.interests = response.map((interest) => ({
          ...interest,
          selected: false,
        }));
      },
      (error) => {
        console.error('Error fetching interests:', error);
      }
    );
  }

  toggleInterestSelection(interest: any): void {
    interest.selected = !interest.selected;
    if (interest.selected) {
      this.selectedInterests.push({ id: interest._id, name: interest.name });
    } else {
      const index = this.selectedInterests.findIndex(
        (i) => i.id === interest._id
      );
      if (index !== -1) {
        this.selectedInterests.splice(index, 1);
      }
    }
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    // Extract only the IDs from the selected interests array
    const interestIds = this.selectedInterests.map((interest) => interest.id);
    console.log(interestIds);

    // Make a POST request with only the interest IDs
    this.http
      .post(`${this.url}${this.profileId}/interests`, {
        interests: interestIds,
      })
      .subscribe(
        (response) => {
          console.log('Interests added successfully:', response);
          this.router.navigate(['/']);

          this.http
            .put(`http://localhost:3000/api/v1/customers/${this.profileId}`, {
              Identificated: true,
            })
            .subscribe((res: any) => {
              console.log(res);
              if (res.success) {
                this.router.navigate(['/']);
              }
            });
        },
        (error) => {
          console.error('Error adding interests:', error);
          // Handle error
        }
      );
  }
}
