import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public customer: any;
  public userForm!: FormGroup;
  public imageUrl: string = '';
  private id:string = "";
  private apiUrl = 'http://localhost:3000/api/v1/customers/';
  public setLoading:boolean = false;
  constructor(
    private auth: AuthUserService,
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder
  ) { 
    this.userForm = this.fb.group({
      firstName: [ '', Validators.required],
      lastName: [ '', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [ ''],
      profileImage: [ ''],
      bio: [''],
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

          //console.log(res);

          this.initializeForm(res.customer);

          this.id = res.customer._id;
        }, (err: any) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  initializeForm(data: any): void {
    console.log(data.firstName);
  
    this.userForm.patchValue({
      firstName: data?.firstName || '',
      lastName: data?.lastName || '',
      email: data?.email || '',
      phoneNumber: data?.phoneNumber || '',
      bio: data?.bio || '',
    });

    //console.log(data.profileImage);
    

    this.imageUrl = data.profileImage;
  }

  onSubmit(): void {
    
    this.setLoading = true;
    this.userForm.value['profileImage'] = this.imageUrl;

    //console.log(this.userForm.value);
    
    try {
      this.http.put(`${this.apiUrl}${this.id}`,this.userForm.value).subscribe(
        (res:any)=>{
          //console.log(res);
          if(res.success){
            this.setLoading = false;
          }
        }
      )

    } catch (error) {
      
    }
    
  }

  onImageChange(event: any) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  openImage() {
    const inputElement = document.getElementById('image') as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  }

}
