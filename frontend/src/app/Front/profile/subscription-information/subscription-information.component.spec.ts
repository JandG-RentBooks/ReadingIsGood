import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionInformationComponent } from './subscription-information.component';

describe('SubscriptionInformationComponent', () => {
  let component: SubscriptionInformationComponent;
  let fixture: ComponentFixture<SubscriptionInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
