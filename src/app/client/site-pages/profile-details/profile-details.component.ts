import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent  implements OnInit{
  customer: any;

  constructor(
    private auth: AuthUserService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private route : ActivatedRoute
  ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');


    try {
      this.http.get(`http://localhost:3000/api/v1/customers/${id}`,).subscribe(
        (res: any) => {
          if (!res.success) {
            this.router.navigate(["Login"]);
          }
          console.log(res);
          this.customer = res.customer;
       
        }, (err: any) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

}
