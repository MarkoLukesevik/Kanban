import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPopup } from './sidebar-popup';

describe('SidebarPopup', () => {
  let component: SidebarPopup;
  let fixture: ComponentFixture<SidebarPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
