import { Component, inject, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { EmployeeDocument } from '../../types/employee-document';
import { EmployeePosition } from '../../types/employee-position';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-document-modal',
  templateUrl: './document-modal.component.html',
  styleUrls: ['./document-modal.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
})
export class DocumentModalComponent {
  employeeForm: FormGroup;
  positions: EmployeePosition = ['Developer', 'Manager', 'Designer', 'QA'];
  private formBuilder = inject(FormBuilder);
  private documentService = inject(DocumentService);
  private dialogRef = inject(MatDialogRef<DocumentModalComponent>);
  constructor(@Inject(MAT_DIALOG_DATA) public documentData: EmployeeDocument) {
    this.employeeForm = this.formBuilder.group({
      fullName: [
        documentData?.fullName || '',
        [Validators.required, Validators.maxLength(128)],
      ],
      salary: [
        documentData?.salary || '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      email: [documentData?.email || '', [Validators.email]],
      position: [documentData?.position || '', [Validators.required]],
    });
  }

  save() {
    if (this.employeeForm.valid) {
      const doc: EmployeeDocument = {
        ...this.documentData,
        ...this.employeeForm.value,
      };
      if (this.documentData) {
        this.documentService.updateDocument(doc);
      } else {
        this.documentService.addDocument(doc);
      }
      this.dialogRef.close();
    }
  }
}
