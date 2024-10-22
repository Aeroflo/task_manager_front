import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { TaskStatus } from "../constants/task-status";
import { Task } from "../models/task";

@Injectable({
    providedIn: 'root'
})
export class TaskService{

    apiUrl : string = 'http://localhost:8080/tasks';

    constructor(private httpClient : HttpClient){

    }

    createTask(task : Task) : Observable<Task>{
        return this.httpClient.post<Task>(
            this.apiUrl, 
            task,
       );
    }

    getAllTask(taskStatus : TaskStatus | null) : Observable<Task[]>{
        const httpParam : HttpParams | undefined = taskStatus ? new HttpParams().append('taskStatus', taskStatus) : undefined;
        return this.httpClient.get<Task[]>(
             this.apiUrl,
             {params : httpParam}
        );
    }

    updateTask(task : Task) : Observable<Task>{
        return this.httpClient.put<Task>(
            this.apiUrl+'/'+task.id, 
            task,
       );
    }

    deleteTask(id : String) : Observable<void>{
        return this.httpClient.delete<void>(
            this.apiUrl+'/'+id 
        )
    }
}