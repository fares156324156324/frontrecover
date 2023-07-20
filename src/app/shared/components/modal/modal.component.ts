import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { NbDialogRef } from "@nebular/theme";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @Input() title = "Confirm";
  @Input() body = "Are you sure ?";
  @Input() btnConfirm = "Confirm";
  @Input() btnCancel = "Cancel";

  @Input() hide = false;
  @Input() loading = false;
  @Input() onlyConfirm = false;
  @Input() showTimes = true;

  @Input() withInput = false;
  @Input() inputType = "password";

  @Output() inputSubmitted = new EventEmitter<string>();

  protected inputValue = "";

  constructor(private dialogRef: NbDialogRef<ModalComponent>) {}

  ngOnInit(): void {}

  onSubmit(value: any) {
    if (this.withInput) {
      this.inputSubmitted.emit(this.inputValue);
    } else {
      this.dialogRef.close(value);
    }
}
}
