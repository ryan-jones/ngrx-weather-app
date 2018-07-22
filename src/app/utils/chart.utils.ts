import { ICityData, ICityTemp } from '../models/weather.model';


export const createLineChartOpts = (cityData: ICityData) => {
	return {
		title: {
			text: `Recent Temps in ${cityData.cityName}`
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		toolbox: {
			feature: {
				saveAsImage: {}
			}
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: cityData.temperatures.map((temp: ICityTemp) => temp.date)
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		series: [
			{
				name: `In Celsius`,
				type: 'line',
				stack: '1',
				areaStyle: { normal: {} },
				data: cityData.temperatures.map((temp: ICityTemp) => temp.temp)
			},
		]
	};
};
