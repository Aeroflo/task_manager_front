import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTaskElementComponent } from './component-task-element.component';

describe('ComponentTaskElementComponent', () => {
  let component: ComponentTaskElementComponent;
  let fixture: ComponentFixture<ComponentTaskElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentTaskElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTaskElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
