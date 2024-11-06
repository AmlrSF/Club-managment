import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubMemebrsListComponent } from './club-memebrs-list.component';

describe('ClubMemebrsListComponent', () => {
  let component: ClubMemebrsListComponent;
  let fixture: ComponentFixture<ClubMemebrsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubMemebrsListComponent]
    });
    fixture = TestBed.createComponent(ClubMemebrsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
