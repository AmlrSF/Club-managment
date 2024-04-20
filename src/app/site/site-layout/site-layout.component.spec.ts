import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLayoutComponent } from './site-layout.component';

describe('SiteLayoutComponent', () => {
  let component: SiteLayoutComponent;
  let fixture: ComponentFixture<SiteLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteLayoutComponent]
    });
    fixture = TestBed.createComponent(SiteLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
