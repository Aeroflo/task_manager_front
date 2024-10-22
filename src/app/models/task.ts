import { TaskStatus } from "../constants/task-status";

export class Task {
    id: string | null;
    label: string;
    description: string;
    taskStatus :  TaskStatus;
  
    constructor(id: string | null, label: string, description: string, taskStatus : TaskStatus) {
      this.id = id;
      this.label = label;
      this.description = description;
      this.taskStatus = taskStatus
    }
  }