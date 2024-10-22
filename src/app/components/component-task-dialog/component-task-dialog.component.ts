import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-component-task-dialog',
  templateUrl: './component-task-dialog.component.html',
  styleUrls: ['./component-task-dialog.component.less'],
})
export class ComponentTaskDialogComponent implements OnInit {

  form! : FormGroup;

  constructor(
      private fb : FormBuilder,
      public dialogRef: MatDialogRef<ComponentTaskDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Task,
  ) { 
   
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      titre : [this.data.label, Validators.required],
      description : [this.data.description, Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  enregistrer() : void {
    console.log(this.form)
    if(this.form.valid){
      this.data.label = this.form.controls.titre.value
      this.data.description = this.form.controls.description.value
      this.dialogRef.close(this.data)
    }
  }

}
