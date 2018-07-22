import {
	Component,
	EventEmitter,
	Input,
	OnChanges,
	Output
} from '@angular/core';

@Component({
	selector: 'app-chart',
	template: `
      <div class="container-fluid chart-container">
				<div echarts id="chart"
						 [options]="chartOptions"
           	 [loading]="chartLoading"
             (chartInit)="onChartInit($event)"
             (chartClick)="onChartClick($event)"
             [ngStyle]="{ 'height': height, 'max-width': '100%'}">
        </div>
      </div>
    `
})
export class ChartComponent implements OnChanges {
	@Input() data: any;
	@Input() height: string;
	@Output() chartClickEmit = new EventEmitter<any>();

	public echartsInstance: any;
	public chartLoading = false;
	public chartOptions = {};

	constructor() { }

	ngOnChanges(): void {
		if (this.echartsInstance && this.data) {
			this.echartsInstance.resize();
			this.echartsInstance.setOption(this.data);
		}
	}

	public onChartInit(ec): void {
		this.echartsInstance = ec;
		if (this.echartsInstance) {
			setTimeout(() => {
				try {
					if (this.echartsInstance) {
						this.echartsInstance.resize();
						if (this.data) {
							this.echartsInstance.setOption(this.data);
						}
					}
				} catch (err) { }
			}, 500); // Slight delay of chart render
		}
	}

	public onChartClick = (event: any): void => this.chartClickEmit.emit(event);
}
