import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNavbarComponent } from './site-navbar.component';

describe('SiteNavbarComponent', () => {
  let component: SiteNavbarComponent;
  let fixture: ComponentFixture<SiteNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteNavbarComponent]
    });
    fixture = TestBed.createComponent(SiteNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
