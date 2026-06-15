import {Component, OnInit} from '@angular/core';
import {TasksService} from "@/services/tasks.service";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-tasks',
  imports: [],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent implements OnInit {

  constructor(
    private tasksService: TasksService
  ) { }

  async ngOnInit() {
    await firstValueFrom(this.tasksService.getTasks());
  }
}
