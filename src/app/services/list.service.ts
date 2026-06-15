import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {InvoicesPreview} from "@/shared/types";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  getTicketCount(): Observable<any> {
    return this.http.get(`${this.baseUrl}/Tickets/count`);
  }

  getPreviewForTickets(tickets: any[]): Observable<InvoicesPreview> {
    return this.http.post<InvoicesPreview>(`${this.baseUrl}/Invoices/preview/` , tickets );
  }

  createInvoice(ticketIds: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/Invoices/EFile-25/`, {TicketIds: ticketIds});
  }

  getPaged(ticketCount: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/Tickets/paged`, {params: {ticketCount: ticketCount}})
  }
}
