import { Component, OnInit, Input } from '@angular/core';
import { InsightsService } from 'src/app/core/service/insights.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-expense-insight',
  templateUrl: './expense-insight.component.html',
  styleUrls: ['./expense-insight.component.css'],
})
export class ExpenseInsightComponent implements OnInit {
  debitData!: any;
  creditData!: any;
  labeldataDebit: any[] = [];
  realdataDebit: any[] = [];
  colordataDebit: any[] = [];

  labeldataCredit: any[] = [];
  realdataCredit: any[] = [];
  colordataCredit: any[] = [];
  constructor(private insightsService: InsightsService) {}
  private chart: Chart<'doughnut', any[], any> | undefined;
  ngOnInit(): void {
    this.getCreditData();
    this.getDebitData();
  }

  RenderChart(
    labeldata: any,
    maindata: any,
    colordata: any,
    type: any,
    id: any
  ) {
    const myChart = new Chart(id, {
      type: type,
      data: {
        labels: labeldata,
        datasets: [
          {
            label: '# of Votes',
            data: maindata,
            backgroundColor: [
              'rgb(142, 200, 191)',
              'rgb(252, 45, 207)',
              'rgb(6, 64, 41)',
              'rgb(73, 7, 42)',
              'rgb(48, 171, 130)',
              'rgb(153, 230, 110)',
              'rgb(183, 136, 21)',
              'rgb(51, 67, 46)',
              'rgb(12, 62, 120)',
              'rgb(115, 91, 52)',
              'rgb(179, 251, 230)',
              'rgb(151, 153, 194)',
              'rgb(6, 181, 35)',
              'rgb(2, 247, 221)',
              'rgb(176, 120, 190)',
              'rgb(6, 108, 172)',
            ],
            borderColor: ['rgba(255, 99, 132, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }


  getDebitData() {
    this.insightsService.debitDonut().subscribe((data: any) => {
      if (data.status === '00') {
        this.debitData = data.response;
        console.log(this.debitData);
        for (let i = 0; i < this.debitData.length; i++) {
          this.labeldataDebit.push(this.debitData[i].description);
          this.realdataDebit.push(this.debitData[i].percentage);
          let color = this.generateRandomColors(this.debitData[i].percentage);
          this.colordataDebit.push(color);
        }

        // Render the chart after data is fetched
        this.RenderChart(
          this.labeldataDebit,
          this.realdataDebit,
          this.colordataDebit,
          'doughnut',
          'debitchart'
        );
      }
    });
  }

  getCreditData() {
    this.insightsService.creditDonut().subscribe((data: any) => {
      if (data.status === '00') {
        this.creditData = data.response;
        console.log(this.creditData);
        for (let i = 0; i < this.creditData.length; i++) {
          this.labeldataCredit.push(this.creditData[i].description);
          this.realdataCredit.push(this.creditData[i].percentage);
          // let color = this.generateRandomColors(this.creditData[i].percentage);
         
          this.colordataCredit.push(this.generateRandomColors(this.creditData[i].percentage));
          console.log('color--- this.colordataCredit');
          console.log(this.colordataCredit);
        }

        // Render the chart after data is fetched
        this.RenderChart(
          this.labeldataCredit,
          this.realdataCredit,
          this.colordataCredit,
          'doughnut',
          'creditchart'
        );
      }
    });
  }

  // generateRandomColors(count: number): string[] {
  //   const colors: string[] = [];
  //   for (let i = 0; i < count; i++) {
  //     const color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  //     colors.push(color);
  //   }
  //   return colors;
  // }
  generateRandomColors(count: number): string[] {
    const colors: string[] = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const rgbColor = `rgb(${r}, ${g}, ${b})`;
      colors.push(rgbColor);
    }
    return colors;
  }
}
