import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-squads',
  templateUrl: './squads.component.html',
  styleUrls: ['./squads.component.css'],
})
export class SquadsComponent implements OnInit {
  private apiUrl: string = 'http://localhost:3000/api/v1/clubs';
  squads: any[] = [];
  filteredSquads: any[] = [];
  public constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.http.get(this.apiUrl).subscribe(
      (clients: any) => {
        console.log(clients);
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
    this.filteredSquads = this.squads.filter(
      (squad) =>
        squad.name.toLowerCase().includes(filterValue) ||
        squad.genre.toLowerCase().includes(filterValue) ||
        squad.description.toLowerCase().includes(filterValue) ||
        `${squad.ownerId.firstName} ${squad.ownerId.lastName}`
          .toLowerCase()
          .includes(filterValue) ||
        squad.createdAt.toLowerCase().includes(filterValue)
    );
  }

  deleteSquad(squad: any) {
    this.http.delete(`${this.apiUrl}/${squad._id}`).subscribe(
      (clients: any) => {
        this.getClients();
      },
      (error: any) => {
        console.error('Error fetching clients:', error);
      }
    );
  }

  ApproveSquad(squad: any) {
    this.http.put(`${this.apiUrl}/${squad._id}`, {approved : !squad.approved}).subscribe(
      (clients: any) => {
        this.getClients();
      },
      (error: any) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
}
