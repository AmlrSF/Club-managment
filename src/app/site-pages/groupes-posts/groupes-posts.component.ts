import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-groupes-posts',
  templateUrl: './groupes-posts.component.html',
  styleUrls: ['./groupes-posts.component.css']
})
export class GroupesPostsComponent implements OnInit {

  groupId: string = "";
  club: any | null = null;
  imageUrl: string | undefined;
  public addpost!: FormGroup;
  setLoding: any;
  id: any;
  posts: any[] = [];

  constructor(private auth:AuthUserService,private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

   

    let token = {
      token: this.auth.getToken()
    };

    // console.log(token);

    try {
      this.http.post(`http://localhost:3000/api/v1/customers/profile`, token).subscribe(
        (res: any) => {
          if (!res.success) {
            this.router.navigate(["Login"]);
          }else{
            let url = this.router.url;

            this.fetchClubById(url.split('/')[2]);
            this.fetchPosts();
        
            this.addpost = this.fb.group({
              content: ['', Validators.required],
            });
          }

          
          this.id = res.customer._id;

        }, (err: any) => {
          console.log(err);
        }
      );
    } catch (error) {
      console.log(error);
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


  fetchClubById(id: string): void {
    this.http.get<any>(`http://localhost:3000/api/v1/clubs/${id}`)
      .subscribe(
        (response: any) => {
          console.log(response);
          this.club = response.club;
        },
        (error: any) => {
          console.error('Error fetching club:', error);
          // Handle error
        }
      );
  }

  fetchPosts(): void {
    try {
      this.setLoding = true;
      this.http.get(`http://localhost:3000/api/v1/posts/${this.club.ownerId}`)
        .subscribe((res: any) => {
          console.log(res);
          this.posts = res.posts;
          this.setLoding = false;
        }, (err: any) => {
          console.error(err);
          this.setLoding = false;
        });
    } catch (error) {
      console.error(error);
    }
  }
  

  submitForm() {
    if (this.addpost.valid) {
      this.addpost.value['imageUrl'] = this.imageUrl;
      try {
        this.setLoding = true;
        let postInfo:any = {
          ...this.addpost.value,
          author:this.id,
          club:this.club.ownerId._id
        }

        console.log(postInfo);
        
        this.http.post('http://localhost:3000/api/v1/posts',postInfo)
          .subscribe((res:any)=>{
            console.log(res);

            this.setLoding = false
          },(err:any)=>{
            console.log(err)
          })
      } catch (error) {

      }
    } else {
      alert("fill in field");
    }
  }
}
