import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedTasksDialogComponent } from './selected-tasks-dialog.component';

describe('SelectedTasksDialogComponent', () => {
  let component: SelectedTasksDialogComponent;
  let fixture: ComponentFixture<SelectedTasksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedTasksDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedTasksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
