import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewColumnModal } from './add-new-column-modal';

describe('AddNewColumnModal', () => {
  let component: AddNewColumnModal;
  let fixture: ComponentFixture<AddNewColumnModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewColumnModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewColumnModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
