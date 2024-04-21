import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroupeComponent } from './new-groupe.component';

describe('NewGroupeComponent', () => {
  let component: NewGroupeComponent;
  let fixture: ComponentFixture<NewGroupeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewGroupeComponent]
    });
    fixture = TestBed.createComponent(NewGroupeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
