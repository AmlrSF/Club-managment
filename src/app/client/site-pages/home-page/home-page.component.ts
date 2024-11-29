import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  posts: any[] = [];
  filteredPosts: any[] = [];
  feeds: any[] = [];
  selectedInterest: string = '';
  searchTerm: string = '';
  customer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthUserService
  ) {}

  ngOnInit(): void {
    const token = { token: this.auth.getToken() };

    this.http
      .post(`http://localhost:3000/api/v1/customers/profile`, token)
      .subscribe(
        (res: any) => {
          if (!res.success) {
            this.router.navigate(['Login']);
          }
          this.customer = res.customer;
        },
        (error) => console.error('Error fetching customer profile:', error)
      );

    this.fetchPosts();
    this.getInterests();
    this.getSavedPosts();
  }

  getInterests(): void {
    this.http.get<any[]>('http://localhost:3000/api/v1/feeds').subscribe(
      (response: any) => {
        this.feeds = response;
        this.feeds = this.feeds.filter(
          (item: any) => item.userId._id == this.customer._id
        );
      },
      (error) => console.error('Error fetching interests:', error)
    );
  }

  fetchPosts(): void {
    this.http.get('http://localhost:3000/api/v1/posts').subscribe(
      (res: any) => {
        this.posts = res.posts;
        this.filteredPosts = res.posts; // Initialize filteredPosts with all posts
      },
      (error) => console.error('Error fetching posts:', error)
    );
  }

  filterPosts(): void {
    this.filteredPosts = this.posts.filter((post) => {
      const matchesSearchTerm = this.searchTerm
        ? post.content.toLowerCase().includes(this.searchTerm.toLowerCase())
        : true;

      return matchesSearchTerm;
    });
  }

  filterPostsBasedOnSelectForm(): void {
    const selectedFeed =
      this.feeds
        .find((item) => item._id === this.selectedInterest)
        ?.interests.map((item: any) => item.name) || []; // Safeguard to handle undefined

    this.filteredPosts = this.posts.filter((post) => {
      let res = selectedFeed.some((item: any) => item === post.genre);

      return res;
    });
  }

  onSearch(): void {
    this.filterPosts();
  }

  onSelectInterest(event: any): void {
    this.selectedInterest = event.target.value;
    this.filterPostsBasedOnSelectForm();
  }

  truncateText(text: string, maxLength: number = 100): string {
    return text.length > maxLength
      ? text.substring(0, maxLength) + '...'
      : text;
  }

  formatReadableDate(dateString: any): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  navigateToPostDetail(id: any): void {
    this.router.navigate([`/posts/post/${id}`]);
  }

  navigateToProfileDetails(id: any): void {
    this.router.navigate([`/profile/${id}`]);
  }

  navigetToClubDetails(id: any): void {
    this.router.navigate([`/squads/squad/${id}`]);
  }

  upVote(id: any): void {
    this.http
      .patch(`http://localhost:3000/api/v1/posts/${id}/upvote`, {
        id: this.customer._id,
      })
      .subscribe(() => this.fetchPosts());
  }

  downVote(id: any): void {
    this.http
      .patch(`http://localhost:3000/api/v1/posts/${id}/downvote`, {
        id: this.customer._id,
      })
      .subscribe(() => this.fetchPosts());
  }

  public savePosts(postId: string): void {
    try {

      this.http
        .post(`http://localhost:3000/api/v1/savePosts`, {
          author: this.customer._id,
          post: postId,
        })
        .subscribe((res: any) => {
          console.log('Post saved:', res);
 
          this.getSavedPosts();
          
        });
    } catch (error) {
      console.error('Error saving post:', error);
    }
  }

  _savedPosts:any[] = [];
  toggledSavedStatus:any;

  public getSavedPosts(): void {
    try {
    
      this.http
        .get(`http://localhost:3000/api/v1/savePosts`)
        .subscribe((res: any) => {
          
          this._savedPosts =  res.data.filter((item:any)=>item.author._id == this.customer._id).map((item:any)=>item.post._id);
          
           console.log(this._savedPosts)
        });
    } catch (error) {
      console.error('Error saving post:', error);
    }
  }
  
}
