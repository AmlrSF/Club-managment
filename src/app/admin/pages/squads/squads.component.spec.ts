import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquadsComponent } from './squads.component';

describe('SquadsComponent', () => {
  let component: SquadsComponent;
  let fixture: ComponentFixture<SquadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SquadsComponent]
    });
    fixture = TestBed.createComponent(SquadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
