import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForPackagingComponent } from './for-packaging.component';

describe('ForPackagingComponent', () => {
  let component: ForPackagingComponent;
  let fixture: ComponentFixture<ForPackagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForPackagingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForPackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
