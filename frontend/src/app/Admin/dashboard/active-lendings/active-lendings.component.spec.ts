import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveLendingsComponent } from './active-lendings.component';

describe('ActiveLendingsComponent', () => {
  let component: ActiveLendingsComponent;
  let fixture: ComponentFixture<ActiveLendingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveLendingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveLendingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
