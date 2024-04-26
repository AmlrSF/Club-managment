import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-list-groupes',
  templateUrl: './list-groupes.component.html',
  styleUrls: ['./list-groupes.component.css']
})
export class ListGroupesComponent implements OnInit {
  public addClub!: FormGroup;
  public imageUrl: string = '';
  clubs: any[] = [];
  id: any;
  setLoding: boolean = false;
  //  addClient: FormGroup<any>;

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

  public closeModel() {
    document.getElementById('editUserModal')?.classList.add('hidden');
  }

  openImage() {
    const inputElement = document.getElementById('image') as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  }

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router, private auth: AuthUserService) { }

  ngOnInit(): void {
    this.id = this.auth.getId();

    console.log(this.id);




    this.fetchClubs();

    this.addClub = this.fb.group({
      clubName: ['', Validators.required],
      description: ['', Validators.required],
      genre: ['', Validators.required],


      categorie: ['', Validators.required]
    });
  }

  fetchClubs(): void {
    this.http.get<any[]>(`http://localhost:3000/api/v1/clubs`)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.clubs = response.clubs.filter(((item: any) => item?.ownerId._id == this.id));
        },
        (error: any) => {
          console.error('Error fetching clubs:', error);
          // Handle error
        }
      );
  }

  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }


  viewClub(club: any): void {

    this.router.navigate([`/Groupes/${club._id}`])
  }

  editClub(club: any): void {
      // Assuming you have a form group for editing (editClientForm)
      this.addClub.patchValue({
        clubName: club.clubName,
        description: club.description,
        genre: club.genre,
  
  
        categorie: club.categorie
     });
  
     this.id = club._id;
     this.imageUrl = club.profilePicture;
  
     // Show the modal
     document.getElementById('editUserModal')?.classList.remove('hidden');
  }

  deleteClub(club: any): void {
    this.http.delete<any[]>(`http://localhost:3000/api/v1/clubs/${club._id}`)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.fetchClubs();
        },
        (error: any) => {
          console.error('Error fetching clubs:', error);
          // Handle error
        }
      );
  }

  submitForm(): void {
    if (this.addClub.valid && this.imageUrl) {
      this.addClub.value['profilePicture'] = this.imageUrl;
      try {
        this.setLoding=true
        this.http.put<any[]>(`http://localhost:3000/api/v1/clubs/${this.id}`,this.addClub.value)
        .subscribe(
          (response: any) => {
            console.log(response);
            this.setLoding=false;
            document.getElementById('editUserModal')?.classList.add('hidden');
            this.fetchClubs();

          },
          (error: any) => {
            console.error('Error fetching clubs:', error);
            // Handle error
          }
        );
      } catch (error) {
        
      }
      

    } else {
      // Form is invalid
      console.error('Form is invalid.');
    }
  }


}