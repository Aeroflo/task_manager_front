import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTaskDialogComponent } from './component-task-dialog.component';

describe('ComponentTaskDialogComponent', () => {
  let component: ComponentTaskDialogComponent;
  let fixture: ComponentFixture<ComponentTaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentTaskDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
