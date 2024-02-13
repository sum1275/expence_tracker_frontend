import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatementSearchComponent } from './modules/statement-search/statement-search.component';
import { FooterComponent } from './modules/master/footer/footer.component';
import {  NavbarComponent  } from './modules/master/navbar/navbar.component';
import {SidebarComponent} from './modules/master/sidebar/sidebar.component';
import { ExpenseInsightComponent } from './modules/expense-insight/expense-insight.component'
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    StatementSearchComponent,
    FooterComponent, 
    NavbarComponent,
    SidebarComponent,
    ExpenseInsightComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  
    

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
