import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{


 
  clients: number = 0;
  projects: number = 0;
  countries: number = 0;
  money: number = 0;

  ngOnInit() {
    // Simulate fetching data from an API or other source
    this.startUpdatingStats();
  }

  startUpdatingStats() {
    // Update the statistics at regular intervals
    setInterval(() => {
      // Simulate an API call to get the updated statistics
      // Replace this with your actual API call logic
      this.clients = Math.min(this.clients + 1, 150);
      this.projects = Math.min(this.projects + 1, 135);
      this.countries = Math.min(this.countries + 1, 50);
      this.money = Math.min(this.money + 1, 500);
    }, 1); // Update every 1000 milliseconds (1 second)
  }


  private baseUrm = "https://sandbox.paymee.tn/api/v2/payments/create";

  private formData = {
    "amount": 220.25,
    "note": "Order #123",
    "first_name": "John",
    "last_name": "Doe",
    "email": "test@paymee.tn",
    "phone": "+21611222333",
    "return_url": "https://www.return_url.tn",
    "cancel_url": "https://www.cancel_url.tn",
    "webhook_url": "https://www.webhook_url.tn",
    "order_id": "244557"
  }

  private apiKey = 'e430b12a45aa846ebc21395a35d43956cae176a1';  // Replace with your actual API key

  // Set up the headers with the authorization token
  private headers = new HttpHeaders({
    'Authorization': `Token ${this.apiKey}`,
    'Content-Type': 'application/json'
  });

  constructor(private http: HttpClient) { }

  public create() {
    this.http.post(this.baseUrm, this.formData, { headers: this.headers }).subscribe(
      (res: any) => {
        console.log(res);

        // Check if the response status is true
        if (res.status === true) {
          // Redirect the user to the payment URL
          window.location.href = res.data.payment_url;
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
