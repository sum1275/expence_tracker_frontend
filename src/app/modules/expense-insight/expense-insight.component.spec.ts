import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseInsightComponent } from './expense-insight.component';

describe('ExpenseInsightComponent', () => {
  let component: ExpenseInsightComponent;
  let fixture: ComponentFixture<ExpenseInsightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseInsightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpenseInsightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
