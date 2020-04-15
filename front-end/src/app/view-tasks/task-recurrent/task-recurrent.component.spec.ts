import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskRecurrentComponent } from './task-recurrent.component';

describe('TaskRecurrentComponent', () => {
  let component: TaskRecurrentComponent;
  let fixture: ComponentFixture<TaskRecurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskRecurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskRecurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
