import { Component, OnInit } from '@angular/core';
import { TasksService } from '@/services/tasks.service';
import { firstValueFrom } from 'rxjs';
import {TasksResponse} from "@/types/tasks-reponse";
import {FilterActionToolbarComponent} from "@/custom/filter-action-toolbar/filter-action-toolbar.component";
import {CurrencyPipe, DatePipe} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-tasks',
  imports: [
    FilterActionToolbarComponent,
    CurrencyPipe,
    DatePipe,
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {
  tableData: TasksResponse | null = null;

  constructor(
    private tasksService: TasksService
  ) { }

  async ngOnInit() {
    this.tableData = await firstValueFrom(this.tasksService.getTasks());
    console.log(this.tableData);
  }
}
