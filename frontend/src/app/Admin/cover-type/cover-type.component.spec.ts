import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverTypeComponent } from './cover-type.component';

describe('CoverTypeComponent', () => {
  let component: CoverTypeComponent;
  let fixture: ComponentFixture<CoverTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
