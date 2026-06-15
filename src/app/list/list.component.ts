import {Component, inject, OnInit} from '@angular/core';
import {ListService} from "@/services/list.service";
import {CommonModule} from '@angular/common';
import {TableLazyLoadEvent, TableModule} from "primeng/table";
import {FilterActionToolbarComponent} from "@/custom/filter-action-toolbar/filter-action-toolbar.component";
import {DialogService, DynamicDialogModule} from "primeng/dynamicdialog";
import {PreviewComponent} from "@/preview/preview.component";
import {firstValueFrom} from "rxjs";
import {Button} from "primeng/button";
import {UiService} from "@/services/ui-service";
import {Toast} from "primeng/toast";
import {AuthService} from "@/services/auth.service";

interface ListRequest {
  page?: number;
  pageSize?: number;
  sortField?: string;
  sortOrder?: 1 | -1;
  search?: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FilterActionToolbarComponent,
    DynamicDialogModule,
    Button,
    Toast
  ],
  providers: [DialogService],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  first = 0;
  rows = 25;
  totalRecords!: number;
  disabled = false;
  details: any[] = [];
  filteredDetails: any[] = [];
  selectedTickets: any[] = [];
  title = "Bill Me List";
  loading = false;
  key = "filterData"
  private readonly authService = inject(AuthService);
  isAuthenticated = this.authService.isAuthenticated;

  constructor(
    private listService: ListService,
    public dialogService: DialogService,
    public uiService: UiService) {
  }

  get selectedConfirmedTickets() {
    return this.selectedTickets.filter(detail =>
      detail.summary?.toUpperCase().includes("BILL_ME_CONFIRMED")
    );
  }

  async ngOnInit() {
    this.totalRecords = await firstValueFrom(this.listService.getTicketCount());
    this.details = await firstValueFrom(this.listService.getPaged(this.totalRecords.toString()));
    this.filteredDetails = this.details;
  }

  async onPreview() {
    if (this.selectedConfirmedTickets.length === 0) {
      this.uiService.warnMessage("No bill me confirmed tickets selected.")
      return;
    }

    this.loading = true;
    const previewData = await firstValueFrom(this.listService.getPreviewForTickets(this.selectedConfirmedTickets));
    const ref = this.dialogService.open(PreviewComponent, {
      data: previewData,
      modal: true,
      maximizable: true,
      closable: true,
      contentStyle: {"background-color": "#e2e6ea"},
      width: "85%",
      height: "90%",
    });
    this.loading = false;

    const ticketIds = await firstValueFrom(ref.onClose);

    if (ticketIds) {
      await firstValueFrom(this.listService.createInvoice(ticketIds));
      this.details = await firstValueFrom(this.listService.getPaged(this.totalRecords.toString()));
      this.selectedTickets = [];
    }
  }

  onSearch(value: string) {
    if (!value) {
      this.filteredDetails = this.details;
      return;
    }

    this.filteredDetails = this.details.filter(detail =>
      detail.email?.toLowerCase().includes(value.toLowerCase()) ||
      detail.summary?.toLowerCase().includes(value.toLowerCase()) ||
      detail.batchId?.toLowerCase().includes(value.toLowerCase()) ||
      detail.cost?.toString().toLowerCase().includes(value.toLowerCase()) ||
      detail.id?.toLowerCase().includes(value.toLowerCase()) ||
      detail.company?.toLowerCase().includes(value.toLowerCase())
    );
  }

  login(): void {
    this.authService.login();
  }
}
