import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTaskManagementComponent } from './component-task-management.component';

describe('ComponentTaskManagementComponent', () => {
  let component: ComponentTaskManagementComponent;
  let fixture: ComponentFixture<ComponentTaskManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentTaskManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTaskManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
