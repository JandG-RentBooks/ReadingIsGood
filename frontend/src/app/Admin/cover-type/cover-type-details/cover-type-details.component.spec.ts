import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverTypeDetailsComponent } from './cover-type-details.component';

describe('CoverTypeDetailsComponent', () => {
  let component: CoverTypeDetailsComponent;
  let fixture: ComponentFixture<CoverTypeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverTypeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverTypeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
