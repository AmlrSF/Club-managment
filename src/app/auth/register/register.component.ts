import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
// import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public signupForm!: FormGroup;
  private apiUrl = 'http://localhost:3000/api/v1/customers/register';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthUserService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

    });
  }

  navigateToRegister() {
    this.router.navigate(['/Login']);
  }

  public onSubmit() {

    if (this.signupForm.valid) {
      console.log(this.signupForm.value);

      try {


        this.http.post(this.apiUrl, this.signupForm.value).subscribe(
          (res: any) => {
            console.log(res);

            if (res.success === false && res.error === 'Email already in use') {
              alert("Email already use")
            }

            if (res.success === true) {
              // Navigate to the login page
              this.router.navigate(['/Login']);
            }

          },
          (err) => {
            console.log(err);
          }
        );


      } catch (error) {
        console.error(error);
      }


    }
  }
}
