import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLoginModal } from './register-login-modal';

describe('RegisterLoginModal', () => {
  let component: RegisterLoginModal;
  let fixture: ComponentFixture<RegisterLoginModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLoginModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLoginModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
