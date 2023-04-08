import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowLendingComponent } from './how-lending.component';

describe('HowLendingComponent', () => {
  let component: HowLendingComponent;
  let fixture: ComponentFixture<HowLendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowLendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowLendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
