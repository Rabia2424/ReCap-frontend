import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClaimDeleteComponent } from './user-claim-delete.component';

describe('UserClaimDeleteComponent', () => {
  let component: UserClaimDeleteComponent;
  let fixture: ComponentFixture<UserClaimDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserClaimDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserClaimDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
