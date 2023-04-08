import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLendingPanelComponent } from './new-lending-panel.component';

describe('NewLendingPanelComponent', () => {
  let component: NewLendingPanelComponent;
  let fixture: ComponentFixture<NewLendingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewLendingPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewLendingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
