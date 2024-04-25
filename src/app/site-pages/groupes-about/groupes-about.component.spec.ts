import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupesAboutComponent } from './groupes-about.component';

describe('GroupesAboutComponent', () => {
  let component: GroupesAboutComponent;
  let fixture: ComponentFixture<GroupesAboutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupesAboutComponent]
    });
    fixture = TestBed.createComponent(GroupesAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
