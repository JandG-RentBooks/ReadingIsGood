import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLendingsDetailsComponent } from './active-lendings-details.component';

describe('ActiveLendingsDetailsComponent', () => {
  let component: ActiveLendingsDetailsComponent;
  let fixture: ComponentFixture<ActiveLendingsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveLendingsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveLendingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
