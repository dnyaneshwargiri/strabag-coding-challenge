import { Component, inject } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { EmployeeDocument } from '../../types/employee-document';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DocumentModalComponent } from '../document-modal/document-modal.component';
import { DocumentService } from '../../services/document.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
  template: `
    <mat-icon
      (click)="editDocument(this.documentData)"
      class="grid-icons"
      aria-hidden="false"
      aria-label="Example home icon"
      fontIcon="edit"
    ></mat-icon>

    <mat-icon
      (click)="deleteDocument(this.documentData.id)"
      class="grid-icons"
      aria-hidden="false"
      aria-label="Example home icon"
      fontIcon="delete_forever"
    ></mat-icon>
  `,
})
export class CustomButtonComponent implements ICellRendererAngularComp {
  public documentData!: EmployeeDocument;
  private dialog = inject(MatDialog);
  private documentService = inject(DocumentService);

  agInit(params: ICellRendererParams): void {
    this.refresh(params);
  }
  refresh(params: ICellRendererParams): boolean {
    this.documentData = params.data;
    return true;
  }
  editDocument(document: EmployeeDocument) {
    this.dialog.open(DocumentModalComponent, {
      width: '400px',
      data: document,
    });
  }
  deleteDocument(id: number) {
    if (confirm('Are you sure you want to delete this document?')) {
      this.documentService.deleteDocument(id);
    }
  }
}
