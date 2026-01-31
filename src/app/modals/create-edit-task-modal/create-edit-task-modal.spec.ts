import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTaskModal } from './create-edit-task-modal';

describe('CreateEditTaskModal', () => {
  let component: CreateEditTaskModal;
  let fixture: ComponentFixture<CreateEditTaskModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditTaskModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditTaskModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
