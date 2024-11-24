import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public clients: any[] = [];
  public squads: any[] = [];
  public profit: number = 0;
  public monthlyData: any[] = [];

  private apiUrl: string = "http://localhost:3000/api/v1/customers";
  private baseUrl = 'http://localhost:3000/api/v1/clubs';
  Posts: any[] = [];

  ngOnInit(): void {
    this.getClients();
    this.getDomains();
    this.getPosts();
  }


  public constructor(private http : HttpClient){}



  public getDomains() {
    this.http.get(this.baseUrl).subscribe(
      (res: any) => {
        this.squads = res.clubs;
        
      },
      (error: any) => {
        console.error('Error fetching domains:', error);
      }
    );
  }

  public getPosts() {
    this.http.get("http://localhost:3000/api/v1/posts").subscribe(
      (res: any) => {
        this.Posts = res.posts;
        console.log(res);
        
        
      },
      (error: any) => {
        console.error('Error fetching domains:', error);
      }
    );
  }

  public getClients() {
    this.http.get(this.apiUrl).subscribe(
      (clients: any) => {
        this.clients = clients.customers;
        
      },
      (error: any) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
}
