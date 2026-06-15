import {Component, OnInit} from '@angular/core';
import {Task} from "@/types/tasks-reponse";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import { TasksService } from '@/services/tasks.service';
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-selected-tasks-dialog',
  imports: [],
  templateUrl: './selected-tasks-dialog.component.html',
  styleUrl: './selected-tasks-dialog.component.scss'
})
export class SelectedTasksDialogComponent implements OnInit {
  contactId: string | undefined;
  contactNotesForTask: any;

  constructor(
    private dialogConfig: DynamicDialogConfig<Task>,
    private taskService: TasksService
  ) {
    this.contactId = this.dialogConfig.data?.contactId
  }

 async ngOnInit() {
    this.contactNotesForTask = await firstValueFrom(this.taskService.getTaskDetails(this.contactId!));
    console.log(this.contactNotesForTask);
  }
}
