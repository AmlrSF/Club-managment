import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  private apiUrl:string = "http://localhost:3000/api/v1/customers"
  clients: any[] = [];
  filteredClients: any[] = [];
  isDropdownOpen: boolean = false;
  private id:string = "";
setLoading: any;
  ;
  filters = [
    { id: 'filter-radio-example-1', value: 'last-day', label: 'Last day' },
    { id: 'filter-radio-example-2', value: 'last-7-days', label: 'Last 7 days' },
    { id: 'filter-radio-example-3', value: 'last-30-days', label: 'Last 30 days' },
    { id: 'filter-radio-example-4', value: 'last-month', label: 'Last month' },
    { id: 'filter-radio-example-5', value: 'last-year', label: 'Last year' },
  ];
  clientsService: any;

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  
  public addClient!: FormGroup;

  constructor(private fb: FormBuilder, private router:Router,private clientS: ClientsService,private http : HttpClient) { }

 

  ngOnInit(): void {
    this.getClients();
    this.addClient = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  getClients(): void {
    this.http.get(this.apiUrl).subscribe(
      (clients: any) => {
        this.clients = clients.customers;
        this.filteredClients = [...this.clients];
        console.log('Clients:', this.clients);
      },
      (error: any) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };
  
    const date = new Date(dateString);
  
    return date.toLocaleString('en-US', options);
  }
  

  viewClient(client: any): void {
    console.log('View Client:', client);

    // Assuming 'id' is a property in your client object
    const clientId = client._id;

    // Navigate to the client details page with the client ID
    this.router.navigate(['/admin/clients/client', clientId]);
  }

  // Function to edit a client
  editClient(client: any): void {
     // Assuming you have a form group for editing (editClientForm)
     this.addClient.patchValue({
      firstName:client.firstName,
      lastName:client.lastName,
      email:client.email,
      role: client.role,
   });

   this.id = client._id;

   // Show the modal
   document.getElementById('editUserModal')?.classList.remove('hidden');
   
  }

  public closeModel(){
    document.getElementById('editUserModal')?.classList.add('hidden');
  }

  // Function to delete a client
  deleteClient(client: any): void {
    this.http.delete(`${this.apiUrl}/${client._id}`).subscribe((res:any)=>{
      console.log(res);
      this.getClients();
    })
  }

  public submitForm(): void {
    if (this.addClient.valid) {
      const formData = { ...this.addClient.value }; // Convert FormGroup to a plain object
  
      // Send formData to the server
      this.http.put(`${this.apiUrl}/${this.id}`, formData).subscribe(
        (res: any) => {
          if(res.success){
            this.getClients();
            this.closeModel();
          }
        }
      );
    } else {
      // Handle form validation errors
      console.log('Form is invalid. Please check the fields.');
    }
  }
  

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      client.firstName.toLowerCase().includes(filterValue) ||
      client.lastName.toLowerCase().includes(filterValue) ||
      client.email.toLowerCase().includes(filterValue) ||
      client.role.includes(filterValue) 
    );
  }
}
