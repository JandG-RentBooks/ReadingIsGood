import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecaivedPackagesDetailsComponent } from './recaived-packages-details.component';

describe('RecaivedPackagesDetailsComponent', () => {
  let component: RecaivedPackagesDetailsComponent;
  let fixture: ComponentFixture<RecaivedPackagesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecaivedPackagesDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecaivedPackagesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
