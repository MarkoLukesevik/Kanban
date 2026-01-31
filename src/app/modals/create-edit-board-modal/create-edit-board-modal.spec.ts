import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditBoardModal } from './create-edit-board-modal';

describe('CreateEditBoardModal', () => {
  let component: CreateEditBoardModal;
  let fixture: ComponentFixture<CreateEditBoardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditBoardModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditBoardModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
