import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-new-groupe',
  templateUrl: './new-groupe.component.html',
  styleUrls: ['./new-groupe.component.css']
})
export class NewGroupeComponent implements OnInit {
  public addClub!: FormGroup ;
  public imageUrl: string = '';
  private id:any = '';
  private url:string="http://localhost:3000/api/v1/clubs";
  setLoding: boolean = false;
  constructor(private fb: FormBuilder,private auth:AuthUserService,private router:Router,private http:HttpClient ) {}

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
    this.addClub = this.fb.group({
      clubName: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
    
      
      categorie: ['', Validators.required]
    });
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

  submitForm(): void {
    if (this.addClub.valid) {
        this.addClub.value['profilePicture'] = this.imageUrl;
        this.addClub.value['ownerId'] = this.id;
        this.setLoding  = true
        this.http.post(this.url,this.addClub.value).subscribe((res:any)=>{
          console.log(res);
          this.setLoding = false;
          this.addClub.reset();
        },(err:any)=>{
          console.log(err);
          
        })
        
    } else {
      // Form is invalid
      console.error('Form is invalid.');
    }
  }
}
