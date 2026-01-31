import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarBoards } from './sidebar-boards';

describe('SidebarBoards', () => {
  let component: SidebarBoards;
  let fixture: ComponentFixture<SidebarBoards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarBoards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarBoards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
