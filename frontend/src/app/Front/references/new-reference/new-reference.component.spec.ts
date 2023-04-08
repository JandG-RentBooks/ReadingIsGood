import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReferenceComponent } from './new-reference.component';

describe('NewReferenceComponent', () => {
  let component: NewReferenceComponent;
  let fixture: ComponentFixture<NewReferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewReferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
