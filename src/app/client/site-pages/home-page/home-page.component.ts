import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  posts: any[]=[];
  id:any;
  

 
  ngOnInit() {
    // Simulate fetching data from an API or other source
    this.id = this.auth.getId();
    this.fetchPosts();
    
  }

  

  constructor(private http: HttpClient,private auth:AuthUserService) { }


  fetchPosts(): void {
    try {
      // console.log(this.club)
      this.http.get(`http://localhost:3000/api/v1/posts`)
        .subscribe((res: any) => {
          console.log(res);
          this.posts = res.posts;

        }, (err: any) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  }
  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }



  downVote(id:any) {
    try {
      this.http.patch(`http://localhost:3000/api/v1/posts/${id}/downvote`,{id:this.id})
      .subscribe((res: any) => {
        console.log(res);
        this.fetchPosts();
      }, (err: any) => {
        console.log(err)
      })
    } catch (error) {
      
    }
  }
  upVote(id:any) {
    try {
      this.http.patch(`http://localhost:3000/api/v1/posts/${id}/upvote`,{id:this.id})
      .subscribe((res: any) => {
        console.log(res);
        this.fetchPosts();
      }, (err: any) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error);
      
    }
  }

  
  // public create() {
  //   this.http.post(this.baseUrm, this.formData, { headers: this.headers }).subscribe(
  //     (res: any) => {
  //       console.log(res);

  //       // Check if the response status is true
  //       if (res.status === true) {
  //         // Redirect the user to the payment URL
  //         window.location.href = res.data.payment_url;
  //       }
  //     },
  //     (err: any) => {
  //       console.log(err);
  //     }
  //   );
  // }
  // startUpdatingStats() {
  //   // Update the statistics at regular intervals
  //   setInterval(() => {
  //     // Simulate an API call to get the updated statistics
  //     // Replace this with your actual API call logic
  //     this.clients = Math.min(this.clients + 1, 150);
  //     this.projects = Math.min(this.projects + 1, 135);
  //     this.countries = Math.min(this.countries + 1, 50);
  //     this.money = Math.min(this.money + 1, 500);
  //   }, 1); // Update every 1000 milliseconds (1 second)
  // }


  // private baseUrm = "https://sandbox.paymee.tn/api/v2/payments/create";

  // private formData = {
  //   "amount": 220.25,
  //   "note": "Order #123",
  //   "first_name": "John",
  //   "last_name": "Doe",
  //   "email": "test@paymee.tn",
  //   "phone": "+21611222333",
  //   "return_url": "https://www.return_url.tn",
  //   "cancel_url": "https://www.cancel_url.tn",
  //   "webhook_url": "https://www.webhook_url.tn",
  //   "order_id": "244557"
  // }

  // private apiKey = 'e430b12a45aa846ebc21395a35d43956cae176a1';  // Replace with your actual API key

  // // Set up the headers with the authorization token
  // private headers = new HttpHeaders({
  //   'Authorization': `Token ${this.apiKey}`,
  //   'Content-Type': 'application/json'
  // });

}
