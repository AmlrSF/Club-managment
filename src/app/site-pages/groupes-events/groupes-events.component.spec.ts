import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupesEventsComponent } from './groupes-events.component';

describe('GroupesEventsComponent', () => {
  let component: GroupesEventsComponent;
  let fixture: ComponentFixture<GroupesEventsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupesEventsComponent]
    });
    fixture = TestBed.createComponent(GroupesEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
