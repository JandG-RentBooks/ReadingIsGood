import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionTypeFormComponent } from './subscription-type-form.component';

describe('SubscriptionTypeFormComponent', () => {
  let component: SubscriptionTypeFormComponent;
  let fixture: ComponentFixture<SubscriptionTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
