import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TaskStatus } from 'src/app/constants/task-status';
import { Task } from 'src/app/models/task';
import { ComponentTaskDialogComponent } from '../component-task-dialog/component-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/tasks.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-component-all-task',
  templateUrl: './component-all-task.component.html',
  styleUrls: ['./component-all-task.component.less']
})
export class ComponentAllTaskComponent implements OnInit {

  tasks : Task[] = [];

  @Input() subjectReloadTaskAll$!: Subject<boolean>

  constructor(public dialog: MatDialog,
    private taskService : TaskService) { }

  ngOnInit(): void {
    this.getAllTask();
    this.subjectReloadTaskAll$.subscribe(() => {
      this.getAllTask()
    })
  }

   getAllTask(){
    this.taskService.getAllTask(null).subscribe({
      next : (response : Task[]) => {
        this.tasks = response
      }
    });
  }

  deleteTask(event : String){
      this.taskService.deleteTask(event).subscribe({
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
}
