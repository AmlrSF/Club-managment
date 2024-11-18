import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  feedForm: FormGroup;
  interests: any[] = [];
  profileId: any;
  private url = 'http://localhost:3000/api/v1/customers/';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthUserService
  ) {
    // Initialize form with name and selectedInterests fields
    this.feedForm = this.fb.group({
      name: [''], // Add name field here
      selectedInterests: [[]], // Array of selected interests
    });
  }

  ngOnInit(): void {
    const token = { token: this.auth.getToken() };

    this.http
      .post(`http://localhost:3000/api/v1/customers/profile`, token)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.profileId = res.customer._id;
          }
        },
        (err: any) => {
          console.error(err);
        }
      );

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

    const selectedInterests = this.feedForm.value.selectedInterests;

    if (interest.selected) {
      selectedInterests.push(interest._id);
    } else {
      const index = selectedInterests.indexOf(interest._id);
      if (index !== -1) {
        selectedInterests.splice(index, 1);
      }
    }

    this.feedForm.patchValue({ selectedInterests });
  }

  onSubmit(): void {
    const formData = this.feedForm.value;

    const feed = {
      name: formData.name,
      interests: formData.selectedInterests,
      userId: this.profileId,
    };

    console.log(feed);

    this.http.post(`http://localhost:3000/api/v1/feeds`, feed).subscribe(
      (response) => {
        console.log('Feed created successfully:', response);
      },
      (error) => {
        console.error('Error creating feed:', error);
      }
    );
  }
}
