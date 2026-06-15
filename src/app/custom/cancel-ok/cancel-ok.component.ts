import { Component, EventEmitter, Input, Output } from "@angular/core";
import {Button} from "primeng/button";

@Component({
  selector: "app-cancel-ok",
  templateUrl: "./cancel-ok.component.html",
  styleUrl: "./cancel-ok.component.css",
  standalone: true,
  imports: [
    Button
  ]
})
export class CancelOkComponent {
  @Input() okButtonLabel = "OK";
  @Input() cancelButtonLabel = "Cancel";
  @Input() disable!: boolean;
  @Output() onCancelClick = new EventEmitter<void>();
  @Output() onOkClick = new EventEmitter<void>();

  cancelClick() {
    this.onCancelClick.emit();
  }

  okClick() {
    this.onOkClick.emit();
  }
}
