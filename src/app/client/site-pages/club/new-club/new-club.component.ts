import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-club',
  templateUrl: './new-club.component.html',
  styleUrls: ['./new-club.component.css'],
})
export class NewClubComponent implements OnInit {
  addClub!: FormGroup;
  public customer: any = null;
  public club: any = null;
  public isEditMode = false;
  imageUrl: string | undefined;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthUserService,
    private router: Router
  ) {}

  interests: any[] = [];

  getInterests(): void {
    this.http.get<any[]>('http://localhost:3000/api/v1/interests').subscribe(
      (response) => {
        this.interests = response;
        //console.log(this.interests);
      },
      (error) => {
        console.error('Error fetching interests:', error);
      }
    );
  }

  ngOnInit(): void {
    const token = {
      token: this.auth.getToken(),
    };

    this.isEditMode = false;

    this.http
      .post(`http://localhost:3000/api/v1/customers/profile`, token)
      .subscribe(
        (res: any) => {
          this.customer = res.customer;
          this.checkEditMode(); // Check if in edit mode after fetching customer
        },
        (err: any) => {
          console.error(err);
        }
      );

    // Initialize the form group
    this.addClub = this.fb.group({
      name: ['', Validators.required],
      clubname: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],
      
      postPermission: ['all', Validators.required],
      invitePermission: ['all', Validators.required]
      
    });

    this.getInterests();
  }

  checkEditMode(): void {
    const editSquadId = this.route.snapshot.queryParamMap.get('editSquad');
    const ownerId = this.route.snapshot.queryParamMap.get('squadOwner');

    if (editSquadId && this.customer && ownerId === this.customer._id) {
      this.isEditMode = true;
      this.fetchClubDetails(editSquadId);
    }
  }

  fetchClubDetails(clubId: string): void {
    this.http.get(`http://localhost:3000/api/v1/clubs/${clubId}`).subscribe(
      (res: any) => {
        if (res.success) {
          this.club = res.club;
          this.addClub.patchValue(this.club); // Fill form with fetched data
          if (this.club.profilePicture) {
            this.imageUrl = this.club.profilePicture;
          }
        } else {
          console.error('Failed to fetch club details');
        }
      },
      (err: any) => {
        console.error('Error fetching club details:', err);
      }
    );
  }

  onImageChange(event: any): void {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageUrl = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }

  openImage(): void {
    const inputElement = document.getElementById('image') as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  }

  async onSubmit(): Promise<void> {
    console.log(this.addClub.value);
   
    
    if (this.addClub.valid) {

      
      let permissions = {
        postPermission: this.addClub.value["postPermission"],
        invitePermission: this.addClub.value["invitePermission"]
      }
  
      delete this.addClub.value["postPermission"]
      delete this.addClub.value["invitePermission"]
  
   
      try {
        const url = this.isEditMode
          ? `http://localhost:3000/api/v1/clubs/${this.club._id}`
          : 'http://localhost:3000/api/v1/clubs';
        const method = this.isEditMode ? 'PUT' : 'POST';

        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...this.addClub.value,permissions ,profilePicture:this.imageUrl , ownerId: this.customer._id }),
        });

        if(response.ok){
          this.router.navigate(["/squads"])
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(this.isEditMode ? 'Club updated successfully' : 'Club created successfully', data);
        this.addClub.reset();
      } catch (error) {
        console.error(this.isEditMode ? 'Error updating club' : 'Error creating club', error);
      }
    }  else {
      // Handle form validation errors
      alert('Form is invalid. Please check the fields.');
    }
  }
}
