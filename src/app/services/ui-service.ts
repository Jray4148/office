import {Injectable} from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor(private messageService: MessageService) {}

  warnMessage(message: string, title: string = "") {
    this.messageService.add({
      key: "message-service",
      severity: "warn",
      summary: title,
      detail: message,
      sticky: true,
    });
  }
}
