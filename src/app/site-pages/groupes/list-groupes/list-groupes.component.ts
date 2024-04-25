import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-list-groupes',
  templateUrl: './list-groupes.component.html',
  styleUrls: ['./list-groupes.component.css']
})
export class ListGroupesComponent implements OnInit {

  clubs: any[] = [];
  id: any;

  constructor(private http: HttpClient, private router: Router,private auth:AuthUserService) { }

  ngOnInit(): void {
    this.id = this.auth.getId();
    
    console.log(this.id);
    
    
    this.fetchClubs();
  }

  fetchClubs(): void {
    this.http.get<any[]>(`http://localhost:3000/api/v1/clubs`)
      .subscribe(
        (response:any) => {
          console.log(response);
          this.clubs = response.clubs.filter(((item:any)=>item?.ownerId._id == this.id));
        },
        (error:any) => {
          console.error('Error fetching clubs:', error);
          // Handle error
        }
      );
  }

  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
  
    const date = new Date(dateString);
  
    return date.toLocaleString('en-US', options);
  }


  viewClub(club: any): void {
    
    this.router.navigate([`/Groupes/${club._id}`])
  }

  editClub(club: any): void {
    // Implement logic to edit club
  }

  deleteClub(club: any): void {
    // Implement logic to delete club
  }

  
}