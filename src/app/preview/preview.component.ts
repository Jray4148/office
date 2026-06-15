import {Component} from '@angular/core';
import {DataViewModule} from 'primeng/dataview';
import {CommonModule} from '@angular/common';
import {Button} from "primeng/button";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {InvoicesPreview} from "@/shared/types";

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [
    CommonModule,
    DataViewModule,
    Button
  ],
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})

export class PreviewComponent {
  preview: InvoicesPreview;

  constructor(
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig) {
    this.preview = config.data;
  }

  createInvoices() {
    const ticketIds = this.preview.invoices.flatMap(invoice =>
      invoice.lineItems?.map(li => li.id) ?? []);

    this.dialogRef.close(ticketIds);
  }
}
