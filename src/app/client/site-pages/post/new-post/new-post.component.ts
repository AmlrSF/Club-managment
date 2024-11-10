import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  postForm!: FormGroup; // Define the form group
  public customer: any = null;
  squadID: any;
  club: any;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthUserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let token = {
      token: this.auth.getToken(),
    };

    console.log(token);

    try {
      this.http
        .post(`http://localhost:3000/api/v1/customers/profile`, token)
        .subscribe(
          (res: any) => {
            this.customer = res.customer;
            console.log(this.customer);
          },
          (err: any) => {
            console.log(err);
          }
        );
    } catch (error) {
      console.log(error);
    }

    this.getInterests();

    this.route.queryParams.subscribe((params) => {
      this.squadID = params['squadID'];

      this.club = params['squad'] == 'squad' ? 'club' : null;
    });
    //localhost:4200/posts/new?squadID=6716bde5a766814a48f5bc18&posttype=squad

    // Initialize the form with form controls and validation
    http: this.postForm = this.fb.group({
      content: ['', Validators.required],
      imageUrl: ['', [Validators.required]],
      genre:['', [Validators.required]]
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
  interests: any[] = [];


  getInterests(): void {
    this.http.get<any[]>('http://localhost:3000/api/v1/interests').subscribe(
      (response) => {
        this.interests = response.map((interest) => ({
          ...interest,
          selected: false,
        }));
      },
      (error) => {
        console.error('Error fetching interests:', error);
      }
    );
  }

  onSubmit(): void {
    console.log(this.postForm.value);

    if (this.postForm.valid) {
      let auth = {
        author: this.customer._id,
      };
      let body = {
        ...this.postForm.value,
        ...auth,
        club: this.squadID != null ? this.squadID : null,
        postType: this.club != null ? 'club' : 'profile',
      };
      console.log(body);
      this.http
        .post('http://localhost:3000/api/v1/posts', {
          ...body,
        })
        .subscribe(
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

// Artificial Intelligence (AI)
// Machine Learning
// Web Development
// Backend Development
// Data Science
// Cybersecurity
// Cloud Computing
// Blockchain
// Mobile App Development
// Internet of Things (IoT)
// DevOps
// AR/VR
// Big Data
// Quantum Computing
// UI/UX Design