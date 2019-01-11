import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../../api.service';
import { CoinInfo } from '../globaldata';

import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {

  coin_data : any;

  BTChistory : any;
  ETHhistory : any;
  LTChistory : any;

  selCoin = 0;
  inteval : any;
  updateFlag =  false;
  Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions = {   chart: {
    type: 'line',    
    backgroundColor: 'transparent'
    },
    title: {
      text: ''
    },  
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
    },
    legend: {
      itemStyle: {
          color: '#E0E0E3',
          fontSize : '15px'
      },
      itemHoverStyle: {
          color: '#FFF'
      },
      itemHiddenStyle: {
          color: '#606063'
      }
    },
    yAxis: {
        title: {
            text: 'Price (USD)'
        },
        lineColor : '#FFFFFF'
    },
    plotOptions: {
        area: {
          fillColor: {
              linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
              },
              stops: [
                  [0, Highcharts.getOptions().colors[0]],
                  [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              ]
          },
          marker: {
              radius: 2
          },
          lineWidth: 1,
          states: {
              hover: {
                  lineWidth: 1
              }
          },
          threshold: null
      }
    },
    series: [{
        name: 'Bitcoin',
        data: [] 
    }]}; // required
    
  intervalString = ['1m','15m','1h','1d'];
  currentInterval = 0;
  constructor(
    private apiservice : ApiService,
    public coinInfo: CoinInfo
  ) { }

  ngOnInit() {
    this.coin_data = this.coinInfo.getCheckedCoins();
    this.getData();
    this.inteval = setInterval(()=>{
     this.getData();
    },60000);       
  }
  ngOnDestroy() {
    // console.log("Leave page");
    if(this.inteval){
      clearInterval(this.inteval);
    }
  }

  getData(){
    this.apiservice.getCryptoPriceHistory(this.coin_data[this.selCoin].market, this.currentInterval)
    .subscribe(data=>{
      if(this.selCoin==0){
        this.BTChistory = data;
      } else if(this.selCoin == 1){
        this.ETHhistory = data;
      } else if(this.selCoin == 2){
        this.LTChistory = data;
      }    
      this.setChartCoin(this.coin_data[this.selCoin].symbol);
    });
  }
  changeStyle($event,i){
    if(i!=this.selCoin)
    this.coin_data[i].hover = $event.type == 'mouseover';
  }
  setSelCoin(i) {
    this.selCoin = i;
    this.coin_data[i].hover = false;
    this.getData();
  }

  setChartCoin(market) {
    if(market == 'BTC'){ 
      this.chartOptions.series[0].data = [];
      this.chartOptions.series[0].name = 'Bitcoin';
      for(let i = 0 ;i < this.BTChistory.data.length; i++){
        // this.chartOptions.xAxis.categories.push(this.BTChistory.data[i].time);
        this.chartOptions.series[0].data.push({x: this.BTChistory.data[i].time, y: parseFloat(this.BTChistory.data[i].priceUsd)});
      }
      this.updateFlag = true;
    } else if( market == 'ETH'){
      this.chartOptions.series[0].data = [];
      this.chartOptions.series[0].name = "Ethereum";
      for(let i = 0 ;i < this.ETHhistory.data.length; i++){
        this.chartOptions.series[0].data.push({x: this.ETHhistory.data[i].time, y: parseFloat(this.ETHhistory.data[i].priceUsd)});  
      }
      this.updateFlag = true;
    } else if (market == 'LTC') {
      this.chartOptions.series[0].data = [];
      this.chartOptions.series[0].name = "Litecoin";
      for(let i = 0 ;i < this.LTChistory.data.length; i++){
        this.chartOptions.series[0].data.push({x: this.LTChistory.data[i].time, y: parseFloat(this.LTChistory.data[i].priceUsd)});
      }
      this.updateFlag = true;
    }
  }

  changeInterval(num){
    this.currentInterval = num;
    this.getData();
  }
}
