import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastRentedComponent } from './last-rented.component';

describe('LastRentedComponent', () => {
  let component: LastRentedComponent;
  let fixture: ComponentFixture<LastRentedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastRentedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastRentedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
