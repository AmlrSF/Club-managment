import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-club',
  templateUrl: './list-club.component.html',
  styleUrls: ['./list-club.component.css']
})
export class ListClubComponent implements OnInit {
  clubs: any[] = []; // Array to hold the list of clubs

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllClubs(); // Fetch all clubs when the component initializes
  }

  getAllClubs(): void {
    this.http.get<any[]>('http://localhost:3000/api/v1/clubs').subscribe(
      (response:any) => {
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
    const genres = new Set(this.clubs.map(club => club.genre)); // Use a Set to get unique genres
    return Array.from(genres); // Convert the Set back to an array
  }

  // Method to get clubs by genre
  getClubsByGenre(genre: string): any[] {
    return this.clubs.filter(club => club.genre === genre); // Filter clubs by the specified genre
  }
}
