import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClaimManagerComponent } from './user-claim-manager.component';

describe('UserClaimManagerComponent', () => {
  let component: UserClaimManagerComponent;
  let fixture: ComponentFixture<UserClaimManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserClaimManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserClaimManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
