import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImageManagerComponent } from './car-image-manager.component';

describe('CarImageManagerComponent', () => {
  let component: CarImageManagerComponent;
  let fixture: ComponentFixture<CarImageManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarImageManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarImageManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
