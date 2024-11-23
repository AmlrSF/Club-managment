import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepliesComponent } from './replies.component';

describe('RepliesComponent', () => {
  let component: RepliesComponent;
  let fixture: ComponentFixture<RepliesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RepliesComponent]
    });
    fixture = TestBed.createComponent(RepliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
