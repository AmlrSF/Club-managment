import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-interets',
  templateUrl: './interets.component.html',
  styleUrls: ['./interets.component.css'],
})
export class InteretsComponent implements OnInit {
  interests: any[] = [];
  id: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    try {
      // Get the full path and extract the ID manually
      const fullPath = this.router.url; // Full URL path
      console.log('Full Path:', fullPath);

      // Split the path and extract the ID (assume ID is after `/profile/`)
      const segments = fullPath.split('/');
      const profileIndex = segments.indexOf('profile'); // Find the "profile" segment

      if (profileIndex !== -1 && segments[profileIndex + 1]) {
        this.id = segments[profileIndex + 1]; // Extract the ID after 'profile'
        console.log('Extracted ID:', this.id);
        this.fetchCustomer(this.id);
      } else {
        console.error('Profile ID not found in route.');
      }
    } catch (error) {
      console.error('Error extracting ID:', error);
    }
  }

  fetchCustomer(id: string): void {
    this.http.get(`http://localhost:3000/api/v1/customers/${id}`).subscribe(
      (res: any) => {
        console.log('Customer Data:', res);
        this.interests = res.customer?.interests;
      },
      (err: any) => {
        console.error('Error fetching customer:', err);
      }
    );
  }
}
