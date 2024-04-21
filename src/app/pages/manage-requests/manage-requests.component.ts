import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.css']
})
export class ManageRequestsComponent implements OnInit {

  clubs: any[] = [];
  id: any;
  setLoading: boolean = false;

  constructor(private http: HttpClient, private router: Router,private auth:AuthUserService) { }

  ngOnInit(): void {
    this.fetchClubs()
  }

  fetchClubs(): void {
    this.setLoading = true;
    this.http.get<any[]>(`http://localhost:3000/api/v1/clubs`)
      .subscribe(
        (response:any) => {
          console.log(response);
          this.clubs = response.clubs.filter((item:any)=>!item.approved);
          this.setLoading = false;
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


 
 
 

  approveClub(clubId: string) {
    this.http.put(`http://localhost:3000/api/v1/clubs/${clubId}`,{approved:true}).subscribe((res:any)=>{
      
    this.fetchClubs();
      
    },(res:any)=>{
      console.log(res);
      
    })
    
}

deleteClub(clubId: string) {
  this.http.delete(`http://localhost:3000/api/v1/clubs/${clubId}`).subscribe((res:any)=>{
      
  this.fetchClubs();
    
  },(res:any)=>{
    console.log(res);
    
  })
}

}
