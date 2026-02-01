import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBoardModal } from './delete-board-modal';

describe('DeleteBoardModal', () => {
  let component: DeleteBoardModal;
  let fixture: ComponentFixture<DeleteBoardModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBoardModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBoardModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
