import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  public loginForm: FormGroup;
  private apiUrl = 'http://localhost:3000/api/v1/customers/login';

  constructor(private auth:AuthUserService,private router: Router, private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {

     
    let token = {
      token : this.auth.getToken()
    }

    console.log(token);
    
    

    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`,token).subscribe(
        (res:any)=>{
        
          if(res.success ==  true) {
            if(res.customer.role == 1){
              this.router.navigate(["admin"] )
            }else{
              this.router.navigate(["/Interests"] )
            }
            
          }
          

        },(err:any)=>{
          console.log(err);
        }
      )
    } catch (error) {
      
    }
  }

  navigateToRegister() {
    this.router.navigate(['/Register']);
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // If the form is valid, proceed with HTTP POST request
      const loginData = this.loginForm.value;

      // Make HTTP POST request
      this.http.post(this.apiUrl, loginData).subscribe(
        (response: any) => {
          // Handle successful response
          console.log('Login successful:', response);

          if (response.token && response.message == "Login successful") {

            this.auth.setToken(response.token)

            if(response.customer.role == 1){
              this.router.navigate(["admin"] )
            }else{
              this.router.navigate(["/Interests"] )
            }
          }
        },
        (error) => {
          // Handle error
          console.error('Error during login:', error);

          // Optionally, you can show an error message to the user
        }
      );
    } else {
      // Handle form validation errors
      console.log('Form is invalid. Please check the fields.');
    }
  }
}
