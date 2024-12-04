import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { EmployeeDocument } from '../../types/employee-document';

@Component({
  selector: 'app-document-modal',
  templateUrl: './document-modal.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class DocumentModalComponent {
  form: FormGroup;
  positions = ['Developer', 'Manager', 'Designer', 'QA'];

  constructor(
    private fb: FormBuilder,
    private documentService: DocumentService,
    private dialogRef: MatDialogRef<DocumentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDocument
  ) {
    this.form = this.fb.group({
      fullName: [
        data?.fullName || '',
        [Validators.required, Validators.maxLength(128)],
      ],
      salary: [
        data?.salary || '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      email: [data?.email || '', [Validators.email]],
      position: [data?.position || '', [Validators.required]],
    });
  }

  save() {
    if (this.form.valid) {
      const doc: EmployeeDocument = { ...this.data, ...this.form.value };
      this.data
        ? this.documentService.updateDocument(doc)
        : this.documentService.addDocument(doc);
      this.dialogRef.close();
    }
  }
}
