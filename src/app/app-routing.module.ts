import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatementSearchComponent } from './modules/statement-search/statement-search.component';
import { ExpenseInsightComponent } from './modules/expense-insight/expense-insight.component'

const routes: Routes = [
  { path: '', redirectTo: '/statements', pathMatch: 'full' },
  { path: 'statments', component: StatementSearchComponent },
  { path: 'expense-insight', component: ExpenseInsightComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
