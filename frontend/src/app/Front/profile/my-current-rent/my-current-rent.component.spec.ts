import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCurrentRentComponent } from './my-current-rent.component';

describe('MyCurrentRentComponent', () => {
  let component: MyCurrentRentComponent;
  let fixture: ComponentFixture<MyCurrentRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCurrentRentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCurrentRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
