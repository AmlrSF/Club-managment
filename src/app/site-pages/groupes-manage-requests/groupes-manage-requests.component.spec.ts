import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupesManageRequestsComponent } from './groupes-manage-requests.component';

describe('GroupesManageRequestsComponent', () => {
  let component: GroupesManageRequestsComponent;
  let fixture: ComponentFixture<GroupesManageRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupesManageRequestsComponent]
    });
    fixture = TestBed.createComponent(GroupesManageRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
