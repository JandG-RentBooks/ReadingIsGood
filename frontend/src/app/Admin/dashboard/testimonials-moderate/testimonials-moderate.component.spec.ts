import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestimonialsModerateComponent } from './testimonials-moderate.component';

describe('TestimonialsModerateComponent', () => {
  let component: TestimonialsModerateComponent;
  let fixture: ComponentFixture<TestimonialsModerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestimonialsModerateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestimonialsModerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
