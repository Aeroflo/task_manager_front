import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/tasks.service';
import { ComponentTaskDialogComponent } from '../component-task-dialog/component-task-dialog.component';
import { filter, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-component-task-element',
  templateUrl: './component-task-element.component.html',
  styleUrls: ['./component-task-element.component.less']
})
export class ComponentTaskElementComponent implements OnInit {

  @Input() task!: Task;
  @Output() messageDelete = new EventEmitter<string>();

  
  constructor(public dialog: MatDialog,
    private taskService : TaskService
    ) {}

  ngOnInit(): void {}

  seeDetails() : void {
   this.openDialogUpdate()
  }

  deleteTask() : void {
    console.log("delete task child", this.task)
    this.messageDelete.emit(this.task!.id!)
  }

  openDialogUpdate() : void {
    const dialogRef = this.dialog.open(ComponentTaskDialogComponent,{
      width: '100%',
      data: this.task
    });

    dialogRef.afterClosed().pipe(
      filter((result: Task) => result != undefined),
        switchMap((result : Task) => this.taskService.updateTask(result))
      ).subscribe((response : Task) => {
          this.task = response
      });
  }

}
