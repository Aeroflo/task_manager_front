import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAllTaskComponent } from './component-all-task.component';

describe('ComponentAllTaskComponent', () => {
  let component: ComponentAllTaskComponent;
  let fixture: ComponentFixture<ComponentAllTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentAllTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentAllTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
