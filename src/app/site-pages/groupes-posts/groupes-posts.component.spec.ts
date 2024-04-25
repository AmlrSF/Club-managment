import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupesPostsComponent } from './groupes-posts.component';

describe('GroupesPostsComponent', () => {
  let component: GroupesPostsComponent;
  let fixture: ComponentFixture<GroupesPostsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupesPostsComponent]
    });
    fixture = TestBed.createComponent(GroupesPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
