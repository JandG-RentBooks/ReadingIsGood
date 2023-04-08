import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLendingComponent } from './create-lending.component';

describe('CreateLendingComponent', () => {
  let component: CreateLendingComponent;
  let fixture: ComponentFixture<CreateLendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
