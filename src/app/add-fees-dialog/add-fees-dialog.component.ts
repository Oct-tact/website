
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FeeAssignment } from '../feetype-dialog/feetype-dialog.component';

export interface FeesData {
  sno: number;
  class: string;
  feesAmount: number;
  quarterFees: { Q1: number; Q2: number; Q3: number; Q4: number };
  quarterDates: { Q1: Date | null; Q2: Date | null; Q3: Date | null; Q4: Date | null };
  status: 'Active' | 'Inactive'; // Add the status property
}

@Component({
  selector: 'app-add-fees-dialog',
  templateUrl: './add-fees-dialog.component.html',
  styleUrls: ['./add-fees-dialog.component.css']
})
export class AddFeesDialogComponent {
  class: string = '';
  feesAmount: number = 0;
  quarterFees = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };
  quarterDates = { Q1: null as Date | null, Q2: null as Date | null, Q3: null as Date | null, Q4: null as Date | null };
  invalidDates = { Q2: false, Q3: false, Q4: false };

  classOptions: string[] =['KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 
     'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 
     'Class XI', 'Class XII'];
  
     feesAssignments: FeeAssignment[] = JSON.parse(localStorage.getItem('feesAssignments') || '[]'); 

     @Output() feesAdded: EventEmitter<FeesData> = new EventEmitter<FeesData>();
  constructor(
    public dialogRef: MatDialogRef<AddFeesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    
  ) {}

 


  calculateQuarterFees(): void {
    const perQuarter = this.feesAmount / 4;
    this.quarterFees.Q1 = perQuarter;
    this.quarterFees.Q2 = perQuarter;
    this.quarterFees.Q3 = perQuarter;
    this.quarterFees.Q4 = perQuarter;
  }



  getClassTotalAmount(): void {
    const feeAssignment = this.feesAssignments.find(assignment => assignment.class === this.class);
    if (feeAssignment) {
      this.feesAmount = feeAssignment.totalAmount;
      this.calculateQuarterFees();
    } else {
      // Handle case where class is not found
    }
  }

  onClassChange(): void {
    this.getClassTotalAmount();
  }

  onDateChange(quarter: string): void {
    if (quarter === 'Q1' && this.quarterDates.Q1) {
      this.validateDates();
    }
    if (quarter === 'Q2' && this.quarterDates.Q2) {
      this.invalidDates.Q2 = this.quarterDates.Q1 !== null && this.quarterDates.Q2 < this.quarterDates.Q1;
      this.validateDates();
    }
    if (quarter === 'Q3' && this.quarterDates.Q3) {
      this.invalidDates.Q3 = (this.quarterDates.Q1 !== null && this.quarterDates.Q3 < this.quarterDates.Q1) ||
                             (this.quarterDates.Q2 !== null && this.quarterDates.Q3 < this.quarterDates.Q2);
      this.validateDates();
    }
    if (quarter === 'Q4' && this.quarterDates.Q4) {
      this.invalidDates.Q4 = (this.quarterDates.Q1 !== null && this.quarterDates.Q4 < this.quarterDates.Q1) ||
                             (this.quarterDates.Q2 !== null && this.quarterDates.Q4 < this.quarterDates.Q2) ||
                             (this.quarterDates.Q3 !== null && this.quarterDates.Q4 < this.quarterDates.Q3);
      this.validateDates();
    }
  }

  validateDates(): void {
    this.invalidDates.Q2 = this.quarterDates.Q2 !== null && this.quarterDates.Q1 !== null ? this.quarterDates.Q2 < this.quarterDates.Q1 : false;
    this.invalidDates.Q3 = (this.quarterDates.Q3 !== null && this.quarterDates.Q1 !== null && this.quarterDates.Q3 < this.quarterDates.Q1) ||
                           (this.quarterDates.Q3 !== null && this.quarterDates.Q2 !== null && this.quarterDates.Q3 < this.quarterDates.Q2);
    this.invalidDates.Q4 = (this.quarterDates.Q4 !== null && this.quarterDates.Q1 !== null && this.quarterDates.Q4 < this.quarterDates.Q1) ||
                           (this.quarterDates.Q4 !== null && this.quarterDates.Q2 !== null && this.quarterDates.Q4 < this.quarterDates.Q2) ||
                           (this.quarterDates.Q4 !== null && this.quarterDates.Q3 !== null && this.quarterDates.Q4 < this.quarterDates.Q3);
  }

  areDatesValid(): boolean {
    return !this.invalidDates.Q2 && !this.invalidDates.Q3 && !this.invalidDates.Q4;
  }
  // onAddClick(): void {
  //   if (this.areDatesValid()) {
  //     this.dialogRef.close({
  //       class: this.class,
  //       feesAmount: this.feesAmount,
  //       quarterFees: this.quarterFees,
  //       quarterDates: this.quarterDates
  //     });
     
  //   }
  // }

  onAddClick(): void {
    if (this.areDatesValid()) {
      const newFeesData: FeesData = {
        sno: 0, // You can set this value appropriately based on your logic
        class: this.class,
        feesAmount: this.feesAmount,
        quarterFees: this.quarterFees,
        quarterDates: this.quarterDates,
        status: 'Active' // Assuming default status is always 'Active'
      };
      this.feesAdded.emit(newFeesData); // Emit the event with new fees data
      this.dialogRef.close();
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
 
}

























// import { Component, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// export interface FeesData {
//   sno: number;
//   class: string;
//   feesAmount: number;
//   quarterFees: { Q1: number; Q2: number; Q3: number; Q4: number };
//   quarterDates: { Q1: Date | null; Q2: Date | null; Q3: Date | null; Q4: Date | null };
//   status: 'Active' | 'Inactive'; // Add the status property
// }

// @Component({
//   selector: 'app-add-fees-dialog',
//   templateUrl: './add-fees-dialog.component.html',
//   styleUrls: ['./add-fees-dialog.component.css']
// })
// export class AddFeesDialogComponent {
//   class: string = '';
//   feesAmount: number = 0;
//   quarterFees = { Q1: 0, Q2: 0, Q3: 0, Q4: 0 };
//   quarterDates = { Q1: null as Date | null, Q2: null as Date | null, Q3: null as Date | null, Q4: null as Date | null };
//   invalidDates = { Q2: false, Q3: false, Q4: false };

//   feeTypeAmountPairs: { feeType: string, amount: number }[] = [];

//   classOptions: string[] = ['KG', 'Class I', 'Class II', 'Class III', 'Class IV', 'Class V', 
//      'Class VI', 'Class VII', 'Class VIII', 'Class IX', 'Class X', 
//      'Class XI', 'Class XII'];
  
//   feeTypes: string[];

//   constructor(
//     public dialogRef: MatDialogRef<AddFeesDialogComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: any
//   ) {
//     this.feeTypes = data.feeTypes || [];
//   }

//   addFeeTypeAmountPair(): void {
//     this.feeTypeAmountPairs.push({ feeType: '', amount: 0 });
//   }

//   calculateTotalFeesAmount(): void {
//     let total = this.feesAmount;
//     this.feeTypeAmountPairs.forEach(pair => {
//       total += pair.amount;
//     });
//     this.feesAmount = total;
//     this.calculateQuarterFees();
//   }

//   calculateQuarterFees(): void {
//     const perQuarter = this.feesAmount / 4;
//     this.quarterFees.Q1 = perQuarter;
//     this.quarterFees.Q2 = perQuarter;
//     this.quarterFees.Q3 = perQuarter;
//     this.quarterFees.Q4 = perQuarter;
//   }

//   addFees(): void {
//     const feesData: FeesData = {
//       sno: 0,
//       class: this.class,
//       feesAmount: this.feesAmount,
//       quarterFees: { ...this.quarterFees },
//       quarterDates: { ...this.quarterDates },
//       status: 'Active' // Set initial status as Active
//     };
//     this.dialogRef.close(feesData);
//   }

//   onCancel(): void {
//     this.dialogRef.close();
//   }
// }
