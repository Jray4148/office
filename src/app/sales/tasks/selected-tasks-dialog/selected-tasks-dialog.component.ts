import {Component, OnInit} from '@angular/core';
import {EmailResponse, Task} from "@/types/tasks-reponse";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {GenerateFollowUpDetails, GenerateFollowUpRequest, TasksService} from '@/services/tasks.service';
import {firstValueFrom} from "rxjs";
import {DropdownModule} from "primeng/dropdown";
import {Divider} from "primeng/divider";
import {InputText} from "primeng/inputtext";
import {Textarea} from "primeng/textarea";
import {Button} from "primeng/button";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

interface EmailForm {
  subject: FormControl<string | null>;
  body: FormControl<string | null>;
}

@Component({
  selector: 'app-selected-tasks-dialog',
  imports: [
    DropdownModule,
    Divider,
    InputText,
    Textarea,
    Button,
    ReactiveFormsModule
  ],
  templateUrl: './selected-tasks-dialog.component.html',
  styleUrl: './selected-tasks-dialog.component.scss'
})
export class SelectedTasksDialogComponent implements OnInit {
  contactId: string | undefined;
  contactNotesForTask: any;
  contactName: string | undefined;
  task: string | undefined;

  // Form Controls
  emailForm = new FormGroup<EmailForm>({
    subject: new FormControl<string>(""),
    body: new FormControl<string>("")
  });

  constructor(
    private dialogConfig: DynamicDialogConfig<Task>,
    private taskService: TasksService
  ) {
    this.contactId = this.dialogConfig.data?.contactId
    this.contactName = this.dialogConfig.data?.contactMetaData.name
    this.task = this.dialogConfig.data?.name
  }

 async ngOnInit() {
    this.contactNotesForTask = await firstValueFrom(this.taskService.getTaskDetails(this.contactId!));
  }

  async onGenerateFollowUp() {
    const response = await firstValueFrom(this.taskService.generateFollowUp(this.createFollowUpRequest()));
    this.appendFormData(response);
  }

  appendFormData(response: EmailResponse) {
    this.emailForm.get('subject')?.setValue(response.subject);
    this.emailForm.get('body')?.setValue(response.body);
  }

  createFollowUpRequest(): GenerateFollowUpRequest {
    return { Context: this.createFollowUpDetails() }
  }

  createFollowUpDetails(): GenerateFollowUpDetails {
    return {
      task: this.task!,
      notes: this.normalizeNotes(this.contactNotesForTask?.results ?? []),
      contactName: this.contactName!
    }
  }

  normalizeNotes(results: Array<any>): Array<any> {
    return results
      .map(result => ({
        note: result.note,
        dateCreated: result.dateCreated
      }))
      .filter(result => !!result.note);
  }
}
