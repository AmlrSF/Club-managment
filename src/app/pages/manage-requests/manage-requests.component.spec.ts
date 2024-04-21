import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRequestsComponent } from './manage-requests.component';

describe('ManageRequestsComponent', () => {
  let component: ManageRequestsComponent;
  let fixture: ComponentFixture<ManageRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageRequestsComponent]
    });
    fixture = TestBed.createComponent(ManageRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
