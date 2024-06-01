import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FeeTypeComponent } from '../fee-type/fee-type.component';
export interface FeeAssignment {
  sno: number;
  class: string;
  totalAmount: number;
  fees: { feeType: string, amount: number }[];
  status: string;
}

@Component({
  selector: 'app-feetype-dialog',
  templateUrl: './feetype-dialog.component.html',
  styleUrls: ['./feetype-dialog.component.css']
})
export class FeetypeDialogComponent {
  feeForm: FormGroup;
  initialTotalAmount: number = 0;

  classes = ['KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 'Class XI', 'Class XII'];
  // feeTypes = ['Type 1', 'Type 2', 'Type 3', 'Type 4'];
  feeTypes: string[] = []; // Fee types will be passed via data


  constructor(
    public dialogRef: MatDialogRef<FeetypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,

  ) {
    this.feeTypes = data.feeTypes; // Assign the passed fee types to the component's property

    this.feeForm = this.fb.group({
      class: ['', Validators.required],
      totalAmount: [0, Validators.required],
      fees: this.fb.array([])
    });
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
      const newAssignment: FeeAssignment = {
        sno: Date.now(),
        class: formValue.class,
        totalAmount: formValue.totalAmount,
        fees: formValue.fees,
        status: 'Active'
      };
      this.dialogRef.close(newAssignment);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
