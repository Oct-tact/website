// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// export interface FeesData {
 
//   class: string;
//   feesAmount: number;
//   quarterFees: { Q1: number; Q2: number; Q3: number; Q4: number };
// }

// @Component({
//   selector: 'app-edit-fees-dialog',
//   templateUrl: './edit-fees-dialog.component.html',
//   styleUrls: ['./edit-fees-dialog.component.css']
// })
// export class EditFeesDialogComponent {
//   updatedData: FeesData;

//   constructor(
//     public dialogRef: MatDialogRef<EditFeesDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: FeesData
//   ) {
//     this.updatedData = { ...data };
//     this.calculateQuarterFees();
//   }

//   onFeesAmountChange(): void {
//     this.calculateQuarterFees();
//   }

//   calculateQuarterFees(): void {
//     const quarterlyFee = this.updatedData.feesAmount / 4;
//     this.updatedData.quarterFees = {
//       Q1: quarterlyFee,
//       Q2: quarterlyFee,
//       Q3: quarterlyFee,
//       Q4: quarterlyFee
//     };
//   }

//   onUpdateClick(): void {
//     this.dialogRef.close(this.updatedData);
//   }

//   onCancelClick(): void {
//     this.dialogRef.close();
//   }
// }


import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface FeesData {
  class: string;
  feesAmount: number;
  quarterFees: { Q1: number; Q2: number; Q3: number; Q4: number };
  quarterDates: { Q1: Date | null; Q2: Date | null; Q3: Date | null; Q4: Date | null };
}

@Component({
  selector: 'app-edit-fees-dialog',
  templateUrl: './edit-fees-dialog.component.html',
  styleUrls: ['./edit-fees-dialog.component.css']
})
export class EditFeesDialogComponent {
  updatedData: FeesData;
  invalidDates = { Q2: false, Q3: false, Q4: false };
  quarterDates = { Q1: null as Date | null, Q2: null as Date | null, Q3: null as Date | null, Q4: null as Date | null };

  constructor(
    public dialogRef: MatDialogRef<EditFeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FeesData
  ) {
    this.updatedData = { ...data };
    this.calculateQuarterFees();
  }

  onFeesAmountChange(): void {
    this.calculateQuarterFees();
  }

  calculateQuarterFees(): void {
    const quarterlyFee = this.updatedData.feesAmount / 4;
    this.updatedData.quarterFees = {
      Q1: quarterlyFee,
      Q2: quarterlyFee,
      Q3: quarterlyFee,
      Q4: quarterlyFee
    };
  }

  onDateChange(quarter: string): void {
    if (quarter === 'Q1' && this.updatedData.quarterDates.Q1) {
      this.validateDates();
    }
    if (quarter === 'Q2' && this.updatedData.quarterDates.Q2) {
      this.invalidDates.Q2 = this.updatedData.quarterDates.Q1 !== null && this.updatedData.quarterDates.Q2 < this.updatedData.quarterDates.Q1;
      this.validateDates();
    }
    if (quarter === 'Q3' && this.updatedData.quarterDates.Q3) {
      this.invalidDates.Q3 = (this.updatedData.quarterDates.Q1 !== null && this.updatedData.quarterDates.Q3 < this.updatedData.quarterDates.Q1) ||
                             (this.updatedData.quarterDates.Q2 !== null && this.updatedData.quarterDates.Q3 < this.updatedData.quarterDates.Q2);
      this.validateDates();
    }
    if (quarter === 'Q4' && this.updatedData.quarterDates.Q4) {
      this.invalidDates.Q4 = (this.updatedData.quarterDates.Q1 !== null && this.updatedData.quarterDates.Q4 < this.updatedData.quarterDates.Q1) ||
                             (this.updatedData.quarterDates.Q2 !== null && this.updatedData.quarterDates.Q4 < this.updatedData.quarterDates.Q2) ||
                             (this.updatedData.quarterDates.Q3 !== null && this.updatedData.quarterDates.Q4 < this.updatedData.quarterDates.Q3);
      this.validateDates();
    }
  }

  validateDates(): void {
    this.invalidDates.Q2 = this.updatedData.quarterDates.Q2 !== null && this.updatedData.quarterDates.Q1 !== null ? this.updatedData.quarterDates.Q2 < this.updatedData.quarterDates.Q1 : false;
    this.invalidDates.Q3 = (this.updatedData.quarterDates.Q3 !== null && this.updatedData.quarterDates.Q1 !== null && this.updatedData.quarterDates.Q3 < this.updatedData.quarterDates.Q1) ||
                           (this.updatedData.quarterDates.Q3 !== null && this.updatedData.quarterDates.Q2 !== null && this.updatedData.quarterDates.Q3 < this.updatedData.quarterDates.Q2);
    this.invalidDates.Q4 = (this.updatedData.quarterDates.Q4 !== null && this.updatedData.quarterDates.Q1 !== null && this.updatedData.quarterDates.Q4 < this.updatedData.quarterDates.Q1) ||
                           (this.updatedData.quarterDates.Q4 !== null && this.updatedData.quarterDates.Q2 !== null && this.updatedData.quarterDates.Q4 < this.updatedData.quarterDates.Q2) ||
                           (this.updatedData.quarterDates.Q4 !== null && this.updatedData.quarterDates.Q3 !== null && this.updatedData.quarterDates.Q4 < this.updatedData.quarterDates.Q3);
  }

  areDatesValid(): boolean {
    return !this.invalidDates.Q2 && !this.invalidDates.Q3 && !this.invalidDates.Q4;
  }

  onUpdateClick(): void {
    if (this.areDatesValid()) {
      this.dialogRef.close(this.updatedData);
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
