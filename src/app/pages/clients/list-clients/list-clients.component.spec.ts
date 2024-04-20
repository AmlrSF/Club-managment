import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientsComponent } from './list-clients.component';

describe('ListClientsComponent', () => {
  let component: ListClientsComponent;
  let fixture: ComponentFixture<ListClientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListClientsComponent]
    });
    fixture = TestBed.createComponent(ListClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
