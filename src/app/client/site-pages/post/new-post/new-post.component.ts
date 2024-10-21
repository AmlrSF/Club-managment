import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  postForm!: FormGroup; // Define the form group
  public customer:any = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth:AuthUserService
  ) {}

  ngOnInit(): void {
    let token = {
      token: this.auth.getToken()
    };

    console.log(token);

    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`, token).subscribe(
        (res: any) => {
          

         
          this.customer = res.customer;
          console.log(this.customer);
          

        }, (err: any) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
    }
    // Initialize the form with form controls and validation
    this.postForm = this.fb.group({
      content: ['', Validators.required],
      imageUrl: ['', [Validators.required]],
      postType: ['profile', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const file = input.files[0];
      this.convertToBase64(file); // Convert the file to base64
    }
  }

  private convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      this.postForm.patchValue({ imageUrl: base64String }); // Update the form with base64 string
    };
    reader.readAsDataURL(file); // Read file as data URL
  }


  onSubmit(): void {
    console.log(this.postForm.value);
    
    if (this.postForm.valid) {
      
        let auth={
          author:this.customer._id
        }
        this.http.post('http://localhost:3000/api/v1/posts',
          {
           ...this.postForm.value,
           ...auth,
           club:"6716bde5a766814a48f5bc18"
          }).subscribe(
         (response) => {
           console.log('Post created successfully:', response);
           this.router.navigate(['/']); // Redirect to the posts page
           
         },
         (error) => {
           console.error('Error creating post:', error);
         }
       );
   
 
    }
  }
}
