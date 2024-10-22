import { Component, Input, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-component-task-management',
  templateUrl: './component-task-management.component.html',
  styleUrls: ['./component-task-management.component.less'],
})
export class ComponentTaskManagementComponent implements OnInit {

  @Input() subjectReloadTaskManagement$!: Subject<boolean>

  todo : Task[] = [];
  progress : Task[] = [];
  done : Task[] = [];
 
  constructor(private taskService : TaskService) { }

  ngOnInit(): void {
    this.loadAllTasksSorted;
    this.subjectReloadTaskManagement$.subscribe(() => {
      this.loadAllTasksSorted()
    })
  }

  loadAllTasksSorted(){
    this.getTask(TaskStatus.TODO);
    this.getTask(TaskStatus.IN_PROGRESS)
    this.getTask(TaskStatus.DONE)
  }

  deleteTask(event : string){
    console.log("Delete task")
    this.taskService.deleteTask(event).subscribe({
      next : () => {
        this.todo = this.todo.filter( element => element.id !== event);
        this.progress = this.progress.filter( element => element.id !== event);
        this.done = this.done.filter( element => element.id !== event);
      }
    })
  }



  private getTask(taskStatus : TaskStatus){
    this.taskService.getAllTask(taskStatus).subscribe({
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


  dropTodo(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.moveTaskToStatus(event, TaskStatus.TODO)
    }
  }

  dropProgress(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.moveTaskToStatus(event, TaskStatus.IN_PROGRESS)
    }
  }

  dropDone(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.moveTaskToStatus(event, TaskStatus.DONE)
    }
  }

  moveTaskToStatus(event: CdkDragDrop<Task[]>, newStatus: TaskStatus){
    const currentTask = event.previousContainer.data[event.previousIndex]
      const taskPreviousStatus = currentTask.taskStatus;
      currentTask.taskStatus = newStatus
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.updateTaskToStatus(currentTask).subscribe({
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
}
