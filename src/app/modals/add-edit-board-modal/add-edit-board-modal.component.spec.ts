import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBoardModalComponent } from './add-edit-board-modal.component';

describe('AddEditBoardModalComponent', () => {
  let component: AddEditBoardModalComponent;
  let fixture: ComponentFixture<AddEditBoardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBoardModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditBoardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
