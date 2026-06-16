import {Component, OnInit} from '@angular/core';
import {Task} from "@/types/tasks-reponse";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import { TasksService } from '@/services/tasks.service';
import {firstValueFrom} from "rxjs";
import {DropdownModule} from "primeng/dropdown";
import {Divider} from "primeng/divider";
import {InputText} from "primeng/inputtext";
import {Textarea} from "primeng/textarea";
import {Button} from "primeng/button";

@Component({
  selector: 'app-selected-tasks-dialog',
  imports: [
    DropdownModule,
    Divider,
    InputText,
    Textarea,
    Button
  ],
  templateUrl: './selected-tasks-dialog.component.html',
  styleUrl: './selected-tasks-dialog.component.scss'
})
export class SelectedTasksDialogComponent implements OnInit {
  contactId: string | undefined;
  contactNotesForTask: any;
  contactName: string | undefined;

  constructor(
    private dialogConfig: DynamicDialogConfig<Task>,
    private taskService: TasksService
  ) {
    this.contactId = this.dialogConfig.data?.contactId
    this.contactName = this.dialogConfig.data?.contactMetaData.name
  }

 async ngOnInit() {
    this.contactNotesForTask = await firstValueFrom(this.taskService.getTaskDetails(this.contactId!));
    console.log(this.contactNotesForTask);
  }
}
