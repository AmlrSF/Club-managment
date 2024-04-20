import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientDetailComponent } from './client-detail.component';

describe('ClientDetailComponent', () => {
  let component: ClientDetailComponent;
  let fixture: ComponentFixture<ClientDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientDetailComponent]
    });
    fixture = TestBed.createComponent(ClientDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
