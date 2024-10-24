import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { Task } from 'src/app/models/task';
import { TaskStatus } from 'src/app/constants/task-status';
import { environment } from 'src/environments/environment';
import { TaskService } from 'src/app/services/tasks.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-component-task-management',
  templateUrl: './component-task-management.component.html',
  styleUrls: ['./component-task-management.component.less'],
})
export class ComponentTaskManagementComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>()

  @Input() subjectReloadTaskManagement$!: Subject<boolean>

  todo : Task[] = [];
  progress : Task[] = [];
  done : Task[] = [];
 
  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
    this.loadAllTasksSorted;
    this.subjectReloadTaskManagement$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadAllTasksSorted()
      })
  }

  loadAllTasksSorted() : void{
    this.getTask(TaskStatus.TODO);
    this.getTask(TaskStatus.IN_PROGRESS)
    this.getTask(TaskStatus.DONE)
  }

  deleteTask(event : string) : void{
    console.log("Delete task")
    this.taskService.deleteTask(event)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next : () => {
          this.todo = this.todo.filter( element => element.id !== event);
          this.progress = this.progress.filter( element => element.id !== event);
          this.done = this.done.filter( element => element.id !== event);
        }
    })
  }



  private getTask(taskStatus : TaskStatus) : void{
    this.taskService.getAllTask(taskStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next : (response : Task[]) => {
          switch(taskStatus){
            case TaskStatus.TODO : {
              this.todo = response
              break
            }
            case TaskStatus.IN_PROGRESS : {
              this.progress = response
              break
            }
            case TaskStatus.DONE : {
              this.done = response
              break
            }
          }
      }
    });
  }


  dropTodo(event: CdkDragDrop<Task[]>) : void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.moveTaskToStatus(event, TaskStatus.TODO)
    }
  }

  dropProgress(event: CdkDragDrop<Task[]>) : void{
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.moveTaskToStatus(event, TaskStatus.IN_PROGRESS)
    }
  }

  dropDone(event: CdkDragDrop<Task[]>) : void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.moveTaskToStatus(event, TaskStatus.DONE)
    }
  }

  moveTaskToStatus(event: CdkDragDrop<Task[]>, newStatus: TaskStatus) : void{
    const currentTask = event.previousContainer.data[event.previousIndex]
      const taskPreviousStatus = currentTask.taskStatus;
      currentTask.taskStatus = newStatus
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.updateTaskToStatus(currentTask)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next : (response : Task) => {
            
          },
          error: (error) => {
            transferArrayItem(
              event.container.data,
              event.previousContainer.data,
              event.currentIndex,
              event.previousIndex
            );
            currentTask.taskStatus = taskPreviousStatus
          }
      });
  }

  updateTaskToStatus(task: Task) : Observable<Task>{
    return this.taskService.updateTask(task);
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
