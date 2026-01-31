import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskInfoModal } from './task-info-modal';

describe('TaskInfoModal', () => {
  let component: TaskInfoModal;
  let fixture: ComponentFixture<TaskInfoModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskInfoModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskInfoModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
