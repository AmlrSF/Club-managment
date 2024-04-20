import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userForm!: FormGroup;
  profileImageUrl: string | undefined;
  private apiUrl = 'http://localhost:3000/api/v1/customers/';
  public setLoading:boolean = false;
  public imageUrl: string = '';
  profileId: any;
  file: File | undefined;
  
  constructor(private router:Router,private formBuilder: FormBuilder, private http:HttpClient, private auth:AuthUserService ) {
    this.userForm = this.formBuilder.group({
     
      phoneNumber: [''],
      profileImage: [''],
      bio: [''],
      facebookLink: [''],
      linkedinLink: [''],
      classe: [''],
      cvAttachment: ['']
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
            this.profileId = res.customer._id
            if(res.customer.Identificated && res.customer.interests.length>0){
              this.router.navigate(["/"] )
            }
            console.log(this.profileId);
            
            
          }
          

        },(err:any)=>{
          console.log(err);
        }
      )
    } catch (error) {
      
    }
  }

  onSubmit(): void {
    if(this.userForm.valid){
      this.userForm.value['profileImage'] = this.imageUrl;
      this.userForm.value['cvAttachment'] = this.file;
      console.log(this.userForm.value);
      
      try {
        this.setLoading = true;
        this.http.put(`${this.apiUrl}${this.profileId}`,this.userForm.value).subscribe(
          (res:any)=>{
            console.log(res);
            if(res.success){
              this.setLoading = false;
              this.router.navigate(["/Interests"] )
            }
          }
        )
  
      } catch (error) {
        
      }

    }else{
      console.log("nigga");
      
    }
  }



  onCVAttachmentChange(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
       this.file = files[0];
      console.log('Selected file:', this.file);
      // Now you have access to the selected file, you can perform further actions such as uploading it to a server.
    } else {
      console.log('No file selected');
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
