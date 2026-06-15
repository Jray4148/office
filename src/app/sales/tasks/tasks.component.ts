import { Component, OnInit } from '@angular/core';
import { TasksService } from '@/services/tasks.service';
import { firstValueFrom } from 'rxjs';
import {TasksResponse} from "@/types/tasks-reponse";

@Component({
  selector: 'app-tasks',
  imports: [],
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
  }
}
