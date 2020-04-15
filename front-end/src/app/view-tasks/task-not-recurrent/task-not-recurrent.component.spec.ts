import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNotRecurrentComponent } from './task-not-recurrent.component';

describe('TaskNotRecurrentComponent', () => {
  let component: TaskNotRecurrentComponent;
  let fixture: ComponentFixture<TaskNotRecurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskNotRecurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskNotRecurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
