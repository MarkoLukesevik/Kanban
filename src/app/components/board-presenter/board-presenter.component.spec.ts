import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPresenterComponent } from './board-presenter.component';

describe('BoardPresenterComponent', () => {
  let component: BoardPresenterComponent;
  let fixture: ComponentFixture<BoardPresenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardPresenterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoardPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
