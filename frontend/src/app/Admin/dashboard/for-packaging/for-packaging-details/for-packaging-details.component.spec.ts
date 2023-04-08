import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForPackagingDetailsComponent } from './for-packaging-details.component';

describe('ForPackagingDetailsComponent', () => {
  let component: ForPackagingDetailsComponent;
  let fixture: ComponentFixture<ForPackagingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForPackagingDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForPackagingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
