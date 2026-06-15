import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Button} from "primeng/button";
import {Divider} from "primeng/divider";
import {IconField} from "primeng/iconfield";
import {InputText} from "primeng/inputtext";
import {InputIcon} from "primeng/inputicon";

@Component({
  selector: "app-filter-action-toolbar",
  templateUrl: "./filter-action-toolbar.component.html",
  styleUrl: "./filter-action-toolbar.component.css",
  standalone: true,
  imports: [
    Button,
    Divider,
    IconField,
    InputText,
    InputIcon
  ]
})
export class FilterActionToolbarComponent {
  @Input() actionTitle = "No Title";
  @Input() previewTitle = "Preview";
  @Input() title = "No Title"
  @Input() disable!: boolean;
  @Input() loading = false;
  @Output() search = new EventEmitter();
  @Output() preview = new EventEmitter();

  previewClick() {
    this.preview.emit();
  }

  searchValue(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.emit(value);
  }
}
