import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  private baseUrl = 'http://localhost:3000/api/v1/domains/Domain/client'; 

  public client: any;
  public relatedCDomainsBasedOnTheSameClient : any[] = []
  constructor(private clients: ClientsService, private router : Router,private route: ActivatedRoute,private http:HttpClient) {}

  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
  
    const date = new Date(dateString);
  
    return date.toLocaleString('en-US', options);
  }

  viewdomain(domain: any): void {
    console.log('View domain:', domain);

    // Assuming 'id' is a property in your domain object
    const domainId = domain._id;

    // Navigate to the domain details page with the domain ID
    this.router.navigate(['/admin/domains/domain', domainId]);
  }
  

  ngOnInit(): void {



    // Get the client ID from the route parameters
    const clientId = this.route.snapshot.paramMap.get('id');

    // Check if clientId is available
    if (clientId) {
      // Call the service to get client details by ID
      this.clients.getClientById(clientId).subscribe(
        (res: any) => {
          this.client = res; // Assign client details to the component property
          console.log(this.client);
          
        },
        (error: any) => {
          console.error('Error fetching client details:', error);
        }
      );
    } else {
      console.error('Client ID not found in route parameters.');
    }

    this.http.get(`${this.baseUrl}/${clientId}`).subscribe(
      (res:any)=>{
        this.relatedCDomainsBasedOnTheSameClient = res.data;
        
      },(err:any)=>{
        console.log(err);
        
      }
    )
  }
}
