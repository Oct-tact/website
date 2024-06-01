
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FeeAssignment } from '../fees-assign/fees-assign.component';

@Component({
  selector: 'app-edit-feetype-dialog',
  templateUrl: './edit-feetype-dialog.component.html',
  styleUrls: ['./edit-feetype-dialog.component.css']
})
export class EditFeetypeDialogComponent {
  feeForm: FormGroup;
  initialTotalAmount: number = 0;

  classes = ['KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'];
  feeTypes = ['Type 1', 'Type 2', 'Type 3', 'Type 4'];

  constructor(
    public dialogRef: MatDialogRef<EditFeetypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeeAssignment,
    private fb: FormBuilder
  ) {
    this.feeForm = this.fb.group({
      class: [data.class, Validators.required],
      totalAmount: [data.totalAmount, Validators.required],
      status: [data.status],
      fees: this.fb.array(data.fees.map(fee => this.fb.group({
        feeType: [fee.feeType, Validators.required],
        amount: [fee.amount, [Validators.required, Validators.min(1)]]
     
      })))
    });

    this.initialTotalAmount = data.totalAmount;
  }

  get fees(): FormArray {
    return this.feeForm.get('fees') as FormArray;
  }

  addFee(): void {
    this.fees.push(this.fb.group({
      feeType: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]]
    }));
  }

  removeFee(index: number): void {
    this.fees.removeAt(index);
    this.updateTotalAmount();
  }

  // updateTotalAmount(): void {
  //   const feeAmounts = this.fees.controls.reduce((acc, control) => acc + control.get('amount')?.value, 0);
  //   const total = feeAmounts;
  //   this.feeForm.get('totalAmount')?.setValue(total, { emitEvent: false });
  // }
  updateTotalAmount(): void {
    const feeAmounts = this.fees.controls.reduce((acc, control) => acc + control.get('amount')?.value, 0);
    const manualTotal = this.feeForm.get('totalAmount')?.value || 0;
    const total = this.initialTotalAmount + feeAmounts;
    this.feeForm.get('totalAmount')?.setValue(total, { emitEvent: false });
  }

  manualTotalAmountUpdate(): void {
    const manualTotal = this.feeForm.get('totalAmount')?.value || 0;
    this.initialTotalAmount = manualTotal;
    this.updateTotalAmount();
  }


  onSubmit(): void {
    if (this.feeForm.valid) {
      const formValue = this.feeForm.getRawValue();
      this.dialogRef.close(formValue);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
