export interface LineItem {
  id: string;
}

export interface Invoice {
  lineItems?: LineItem[];
}

export interface InvoicesPreview {
  invoices: Invoice[];
  skippedInvoices: Invoice[];
}
