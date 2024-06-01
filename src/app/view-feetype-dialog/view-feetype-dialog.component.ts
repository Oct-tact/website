
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeeAssignment } from '../fees-assign/fees-assign.component';

@Component({
  selector: 'app-view-feetype-dialog',
  templateUrl: './view-feetype-dialog.component.html',
  styleUrls: ['./view-feetype-dialog.component.css']
})
export class ViewFeetypeDialogComponent {
  classes = ['KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'];
  feeTypes = ['Type 1', 'Type 2', 'Type 3', 'Type 4'];

  constructor(
    public dialogRef: MatDialogRef<ViewFeetypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeeAssignment
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
