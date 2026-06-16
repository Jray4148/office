import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {TasksTableData} from "@/types/tasks-reponse";

export interface GenerateFollowUpRequest {
  Context: GenerateFollowUpDetails;
}

export interface GenerateFollowUpDetails {
  task: string;
  notes: Array<string>;
  contactName: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient
  ) { }

  getTasks() {
    const params: Record<string, string> = {
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };

    return this.http.get<TasksTableData>(`${environment.apiBaseUrl}/tasks`, { params });
  }

  getTaskDetails(taskId: string) {
    return this.http.get(`${environment.apiBaseUrl}/tasks/${taskId}`);
  }

  generateFollowUp(request: GenerateFollowUpRequest) {
    return this.http.post(`${environment.apiBaseUrl}/generate-follow-up`, request);
  }
}
