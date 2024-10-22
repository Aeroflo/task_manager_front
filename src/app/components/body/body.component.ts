import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.less']
})
export class BodyComponent implements OnInit {

  subjectReloadTaskAll$: Subject<boolean> = new Subject();
  subjectReloadTaskManagement$ : Subject<boolean> = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log('tabChangeEvent => ', tabChangeEvent);
    console.log('index => ', tabChangeEvent.index);
    switch(tabChangeEvent.index){
      case 0: {
        this.subjectReloadTaskAll$.next(true)
        break;
      }
      case 1: {
        this.subjectReloadTaskManagement$.next(true)
        break;
      }
    }
    
  }

}
