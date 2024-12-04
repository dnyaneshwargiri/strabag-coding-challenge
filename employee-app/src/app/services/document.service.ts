import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmployeeDocument } from '../types/employee-document';
import { MOCK_EMPLOYEE_DOCUMENTS } from '../assets/mock-data';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private documents = new BehaviorSubject<EmployeeDocument[]>(
    MOCK_EMPLOYEE_DOCUMENTS
  );

  documents$ = this.documents.asObservable();

  addDocument(doc: EmployeeDocument) {
    const currentDocs = this.documents.getValue();
    this.documents.next([
      ...currentDocs,
      { ...doc, id: Date.now(), creationDate: new Date() },
    ]);
  }

  updateDocument(updatedDoc: EmployeeDocument) {
    const currentDocs = this.documents.getValue();
    const updatedDocs = currentDocs.map((doc) =>
      doc.id === updatedDoc.id ? updatedDoc : doc
    );
    this.documents.next(updatedDocs);
  }

  deleteDocument(id: number) {
    const currentDocs = this.documents.getValue();
    const filteredDocs = currentDocs.filter((doc) => doc.id !== id);
    this.documents.next(filteredDocs);
  }
}
