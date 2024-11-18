import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-squads',
  templateUrl: './squads.component.html',
  styleUrls: ['./squads.component.css']
})
export class SquadsComponent implements OnInit {
deleteSquad(_t33: any) {
throw new Error('Method not implemented.');
}
editSquad(_t33: any) {
throw new Error('Method not implemented.');
}
viewSquad(_t33: any) {
throw new Error('Method not implemented.');
}
  private apiUrl:string = "http://localhost:3000/api/v1/clubs"
  squads: any[] = [];
  filteredSquads: any[] = [];
  public constructor(private http : HttpClient){}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.http.get(this.apiUrl).subscribe(
      (clients: any) => {
        console.log(clients)
        this.squads = clients.clubs;
        this.filteredSquads = [...this.squads];
        console.log('Clients:', this.squads);
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
  
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredSquads = this.squads.filter(squad =>
      squad.name.toLowerCase().includes(filterValue) ||
      squad.genre.toLowerCase().includes(filterValue) ||
      squad.description.toLowerCase().includes(filterValue) ||
      `${squad.ownerId.firstName} ${squad.ownerId.lastName}`.toLowerCase().includes(filterValue) ||
      squad.createdAt.toLowerCase().includes(filterValue)
    );
  }
  

}
