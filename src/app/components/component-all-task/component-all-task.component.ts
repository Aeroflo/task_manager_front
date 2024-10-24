import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TaskStatus } from 'src/app/constants/task-status';
import { Task } from 'src/app/models/task';
import { ComponentTaskDialogComponent } from '../component-task-dialog/component-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/tasks.service';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-component-all-task',
  templateUrl: './component-all-task.component.html',
  styleUrls: ['./component-all-task.component.less']
})
export class ComponentAllTaskComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>()

  tasks : Task[] = [];

  @Input() subjectReloadTaskAll$!: Subject<boolean>

  constructor(public dialog: MatDialog,
    private taskService : TaskService) { }

  ngOnInit(): void {
    this.getAllTask();
    this.subjectReloadTaskAll$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.getAllTask()
      })
  }

   getAllTask() : void{
    this.taskService.getAllTask(null)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
          next : (response : Task[]) => {
          this.tasks = response
      }
    });
  }

  deleteTask(event : string){
      this.taskService.deleteTask(event)
      .pipe(takeUntil(this.destroy$))
        .subscribe({
          next : () => {
            this.tasks = this.tasks.filter( element => element.id !== event)
          }
      })
  }

  openDialogCreate() : void {
    const dialogRef = this.dialog.open(ComponentTaskDialogComponent,{
      width: '100%',
      data: new Task(null, "", "", TaskStatus.TODO)
    });
    dialogRef.afterClosed().pipe(
      filter((result: Task) => result != undefined),
        switchMap((result : Task) => this.taskService.createTask(result))
      ).subscribe((response : Task) => {
          this.tasks.push(response)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
