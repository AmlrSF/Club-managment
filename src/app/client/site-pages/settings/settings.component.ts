import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public userForm!: FormGroup;
  public setLoading: boolean = false;
  private id: string = "";
  private apiUrl = 'http://localhost:3000/api/v1/customers/';

  constructor(private fb: FormBuilder, private auth: AuthUserService, private router : Router, private http: HttpClient) {
    // Initialize the form with empty values or any default values you want
    this.userForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    let token = {
      token: this.auth.getToken()
    };

    console.log(token);

    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`, token).subscribe(
        (res: any) => {
          if (!res.success) {
            this.router.navigate(["Login"]);
          }



          this.id = res.customer._id;
        }, (err: any) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.setLoading = true;


      console.log(this.userForm.value);

      try {
        this.http.put(`${this.apiUrl}changePass/${this.id}`, this.userForm.value).subscribe(
          (res: any) => {
            console.log(res);
            if (res.success) {
              this.setLoading = false;
              this.auth.logout();
            }else{
              alert(res.error)
            }
          }
        )

      } catch (error) {

      }


    }
  }
}
