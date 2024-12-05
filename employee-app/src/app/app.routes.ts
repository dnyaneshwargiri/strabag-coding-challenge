import { Routes } from '@angular/router';
import { DocumentTableComponent } from './components/document-table/document-table.component';

export const routes: Routes = [
  { path: '', redirectTo: '/page/1', pathMatch: 'full' },
  { path: 'page/:page', component: DocumentTableComponent },
  { path: '**', redirectTo: '/page/1' },
];
