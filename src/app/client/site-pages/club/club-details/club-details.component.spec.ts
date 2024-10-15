import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetailsComponent } from './club-details.component';

describe('ClubDetailsComponent', () => {
  let component: ClubDetailsComponent;
  let fixture: ComponentFixture<ClubDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClubDetailsComponent]
    });
    fixture = TestBed.createComponent(ClubDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
