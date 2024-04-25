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
  setLoding: any = false;
  id: any;
  posts: any[] = [];
  mode: string = "insert";
  selectedId: any;

  constructor(private auth: AuthUserService, private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  public formatReadableDate(dateString: any) {
    const options: any = { year: 'numeric', month: 'long', day: 'numeric' };

    const date = new Date(dateString);

    return date.toLocaleString('en-US', options);
  }

  ngOnInit(): void {


    this.id = this.auth.getId()


    // console.log(token);

    let url = this.router.url;

    this.groupId = url.split('/')[2];
    this.fetchClubById(this.groupId);
    this.fetchPosts();

    this.addpost = this.fb.group({
      content: ['', Validators.required],
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
      // console.log(this.club)
      this.http.get(`http://localhost:3000/api/v1/posts/club/${this.groupId}`)
        .subscribe((res: any) => {
          console.log(res);
          this.posts = res.posts;

        }, (err: any) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  }


  submitForm() {
    if (this.addpost.valid && this.imageUrl) {
      if(this.mode=="update"){
        try {
          this.setLoding=true;
          let updatePostObj :any={
            ...this.addpost.value,
            imageUrl: this.imageUrl
          }
          this.http.put(`http://localhost:3000/api/v1/posts/${this.selectedId}`,updatePostObj)
          .subscribe((res: any) => {
            this.setLoding=false;
            this.addpost.reset();
            this.imageUrl="";
            this.mode="insert";
            this.fetchPosts();
            
            
          }, (err: any) => {
            console.log(err)
          })
        } catch (error) {
          console.log(error);
          
        }
      }else{
        this.addpost.value['imageUrl'] = this.imageUrl;
        try {
          this.setLoding = true;
          let postInfo: any = {
            ...this.addpost.value,
            author: this.id,
            club: this.groupId
          }
  
          console.log(postInfo);
          this.setLoding = true;
          this.http.post('http://localhost:3000/api/v1/posts', postInfo)
            .subscribe((res: any) => {
              console.log(res);
  
              this.setLoding = false
            }, (err: any) => {
              console.log(err)
            })
        } catch (error) {
          console.log("error")
        }
      }
    } else {
      alert("fill in field");
    }
  }

  downVote(id:any) {
    try {
      this.http.patch(`http://localhost:3000/api/v1/posts/${id}/downvote`,{id:this.id})
      .subscribe((res: any) => {
        console.log(res);
        this.fetchPosts();
      }, (err: any) => {
        console.log(err)
      })
    } catch (error) {
      
    }
  }
  upVote(id:any) {
    try {
      this.http.patch(`http://localhost:3000/api/v1/posts/${id}/upvote`,{id:this.id})
      .subscribe((res: any) => {
        console.log(res);
        this.fetchPosts();
      }, (err: any) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error);
      
    }
  }

  public deletePost(id:any){
    try {
      this.http.delete(`http://localhost:3000/api/v1/posts/${id}`)
      .subscribe((res: any) => {
        console.log(res);
        this.fetchPosts();
      }, (err: any) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error);
      
    }
  }

  
  public updatePost(id:any){
    try {
      this.http.get(`http://localhost:3000/api/v1/posts/${id}`)
      .subscribe((res: any) => {
        this.addpost.patchValue({
          content:res.post.content
       });
       this.imageUrl = res?.post.imageUrl;

       this.mode = "update";
       this.selectedId = id;
        
      }, (err: any) => {
        console.log(err)
      })
    } catch (error) {
      console.log(error);
      
    }
  }

}
