import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public clients: any[] = [];
  public domains: any[] = [];
  public profit: number = 0;
  public monthlyData: any[] = [];

  private apiUrl: string = "http://localhost:3000/api/v1/clients";
  private baseUrl = 'http://localhost:3000/api/v1/domains';

  constructor(private http: HttpClient) {};

  private monthNames :any[] = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  ngOnInit(): void {
    this.getClients();
    this.getDomains();
  }

  public calculateMonthlyData(domains: any[]) {
    this.monthlyData = Array.from({ length: 12 }, (_, i) => {
      return {
        month: this.monthNames[i],
        numberOfDomains: 0,
        profit: 0
      };
    });

    domains.forEach((item: any) => {
      const month = new Date(item.startDate).getMonth() + 1;
      this.monthlyData[month - 1].numberOfDomains++;
      this.monthlyData[month - 1].profit += item.buyingPrice - item.purchasePrice;
    });
  }

  public calculateProfit() {
    if (this.domains.length > 0) {
      this.profit = this.domains
        .map((item: any) => item.buyingPrice - item.purchasePrice)
        .reduce((prev, item) => prev + item);
    }
  }

  public getDomains() {
    this.http.get(this.baseUrl).subscribe(
      (res: any) => {
        this.domains = res.data;
        this.calculateMonthlyData(res.data);
        this.calculateProfit();
      },
      (error: any) => {
        console.error('Error fetching domains:', error);
      }
    );
  }

  public getClients() {
    this.http.get(this.apiUrl).subscribe(
      (clients: any) => {
        this.clients = clients.clients;
      },
      (error: any) => {
        console.error('Error fetching clients:', error);
      }
    );
  }
}
