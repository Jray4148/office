import { Component, OnInit } from '@angular/core';
import { TasksService } from '@/services/tasks.service';
import { firstValueFrom } from 'rxjs';
import {TasksTableData} from "@/types/tasks-reponse";
import {FilterActionToolbarComponent} from "@/custom/filter-action-toolbar/filter-action-toolbar.component";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {DialogService} from "primeng/dynamicdialog";
import {SelectedTasksDialogComponent} from "@/sales/tasks/selected-tasks-dialog/selected-tasks-dialog.component";

@Component({
  selector: 'app-tasks',
  imports: [
    FilterActionToolbarComponent,
    PrimeTemplate,
    TableModule
  ],
  providers: [
    DialogService
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tableData: TasksTableData | null = null;

  constructor(
    private tasksService: TasksService,
  private dialogService: DialogService,
  ) { }

  async ngOnInit() {
    this.tableData = await firstValueFrom(this.tasksService.getTasks());
  }

  onRowClick(tableData: TasksTableData) {
    this.taskSelectedDialog(tableData);
  }

  taskSelectedDialog(tableData: TasksTableData) {
    const ref = this.dialogService.open(SelectedTasksDialogComponent, {
      data: tableData,
      modal: true,
      maximizable: true,
      closable: true,
      width: "60%",
    });
  }
}
