import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseCheckbox } from './base-checkbox';

describe('BaseCheckbox', () => {
  let component: BaseCheckbox;
  let fixture: ComponentFixture<BaseCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseCheckbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseCheckbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
