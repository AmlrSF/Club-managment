import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-new-club',
  templateUrl: './new-club.component.html',
  styleUrls: ['./new-club.component.css'],
})
export class NewClubComponent implements OnInit {
  addClub!: FormGroup; // Form group to manage the club creation form
  public customer:any = null;
  constructor(private fb: FormBuilder, private http:HttpClient,private auth:AuthUserService) {} // Inject FormBuilder for form creation

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
    // Initialize the form group with controls and validators
    this.addClub = this.fb.group({
      name: ['', Validators.required], // Squad name
      clubname: ['', Validators.required], // Squad handle
      description: ['', Validators.required], // Squad description
      genre: ['', Validators.required], // Category
      type: ['', Validators.required], // Public or private
      profilePicture: [''], // Optional profile picture
      permissions: this.fb.group({
        // Nested form group for permissions
        postPermission: ['moderators', Validators.required], // Default post permission
        invitePermission: ['all', Validators.required], // Default invite permission
      }),
    });
  }

  async onSubmit() {
    console.log(this.addClub.value);

    if (this.addClub.valid) {
      const formData = this.addClub.value;

      try {
        const response = await fetch('http://localhost:3000/api/v1/clubs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...formData, ownerId:this.customer._id  }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Club created successfully:', data);
        this.addClub.reset();
      } catch (error) {
        console.error('Error creating club:', error);
      }
    } else {
      console.log('Form is invalid');
    }
  }
}
