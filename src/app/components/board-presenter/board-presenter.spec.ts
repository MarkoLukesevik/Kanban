import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPresenter } from './board-presenter';

describe('BoardPresenter', () => {
  let component: BoardPresenter;
  let fixture: ComponentFixture<BoardPresenter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardPresenter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardPresenter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
