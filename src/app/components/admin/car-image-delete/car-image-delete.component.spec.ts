import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarImageDeleteComponent } from './car-image-delete.component';

describe('CarImageDeleteComponent', () => {
  let component: CarImageDeleteComponent;
  let fixture: ComponentFixture<CarImageDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarImageDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarImageDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
