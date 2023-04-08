import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverTypeFormComponent } from './cover-type-form.component';

describe('CoverTypeFormComponent', () => {
  let component: CoverTypeFormComponent;
  let fixture: ComponentFixture<CoverTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverTypeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoverTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
