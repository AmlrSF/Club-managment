import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-groupe-details',
  templateUrl: './groupe-details.component.html',
  styleUrls: ['./groupe-details.component.css'],

})
export class GroupeDetailsComponent implements OnInit {
  groupId: string = "";
  club: any | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    // Get the group ID from the route parameters
    this.route.params.subscribe(params => {
      this.groupId = params['id'];
      // Now you can use this.groupId to access the group ID in your component
      this.fetchClubById(this.groupId);
    });
  }

  fetchClubById(id: string): void {
    this.http.get<any>(`http://localhost:3000/api/v1/clubs/${id}`)
      .subscribe(
        (response: any) => {
          console.log(response);
          
          this.club = response.club;
        },
        (error: any) => {
          console.error('Error fetching club:', error);
          // Handle error
        }
      );
  }
}