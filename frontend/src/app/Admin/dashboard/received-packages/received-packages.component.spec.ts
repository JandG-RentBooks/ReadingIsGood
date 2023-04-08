import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedPackagesComponent } from './received-packages.component';

describe('ReceivedPackagesComponent', () => {
  let component: ReceivedPackagesComponent;
  let fixture: ComponentFixture<ReceivedPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivedPackagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivedPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
