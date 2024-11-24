import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  clubs: any[] = []; // Array to hold all clubs
  pendingApprovalClubs: any[] = []; // Array for clubs needing admin approval
  customer: any;

  constructor(
    private http: HttpClient,
    private auth: AuthUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let token = { token: this.auth.getToken() };

    try {
      this.http
        .post(`http://localhost:3000/api/v1/customers/profile`, token)
        .subscribe(
          (res: any) => {
            if (!res.success) {
              this.router.navigate(['Login']);
            }
            this.customer = res.customer;
            this.getAllClubs(); // Fetch all clubs once the customer data is available
          },
          (err: any) => {
            console.log(err);
          }
        );
    } catch (error) {
      console.log(error);
    }
  }

  getAllClubs(): void {
    this.http.get<any[]>('http://localhost:3000/api/v1/clubs').subscribe(
      (response: any) => {
        this.clubs = response?.clubs.filter(
          (club: any) => club.ownerId._id === this.customer._id
        );

        console.log(this.clubs)
        // Filter clubs where approval is pending
        this.pendingApprovalClubs = this.clubs.filter(
          (club: any) => !club.approved
        );
      },
      (error) => {
        console.error('Error fetching clubs:', error);
      }
    );
  }
}
