import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-club',
  templateUrl: './list-club.component.html',
  styleUrls: ['./list-club.component.css'],
})
export class ListClubComponent implements OnInit {
  customer: any;
  
  clubs: any[] = []; // Array to hold the list of clubs

  constructor(
    private http: HttpClient,

    private auth: AuthUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let token = {
      token: this.auth.getToken(),
    };

    //console.log(token);

    try {
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
    } catch (error) {
      console.log(error);
    }
    this.getAllClubs(); // Fetch all clubs when the component initializes
  }

  getAllClubs(): void {
    this.http.get<any[]>('http://localhost:3000/api/v1/clubs').subscribe(
      (response: any) => {
        this.clubs = response?.clubs; // Assign the response to the clubs array
        console.log('Clubs fetched successfully:', this.clubs);
      },
      (error) => {
        console.error('Error fetching clubs:', error);
      }
    );
  }

  // Method to get unique genres
  getGenres(): string[] {
    const genres = new Set(this.clubs.map((club) => club.genre)); // Use a Set to get unique genres
    return Array.from(genres); // Convert the Set back to an array
  }

  // Method to get clubs by genre
  getClubsByGenre(genre: string): any[] {
    return this.clubs.filter((club) => club.genre === genre); // Filter clubs by the specified genre
  }

  public joinSquad(id: string) {
    try {
      this.http
        .post(`http://localhost:3000/api/v1/clubs/joinclub/${id}`, {
          userId: this.customer._id,
        })
        .subscribe(
          (response: any) => {
            console.log(response);
            this.router.navigate([`/squads/squad/${id}`]);
          },
          (error: any) => {
            console.log(error);
          }
        );
    } catch (error) {}
  }
}
