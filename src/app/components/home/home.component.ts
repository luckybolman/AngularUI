import { Component, OnInit, ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ElectronService} from '../../providers/electron.service';
import * as Highcharts from 'highcharts';
        
import { MarketInfo, AppConstants } from '../globaldata';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  _baseURL : string;
  isBackup : boolean = false;
  portfolios :  any[];
  total_price = 56.4;
  Highcharts = Highcharts; // required
  chartConstructor = 'chart'; // optional string, defaults to 'chart'
  chartOptions = {  
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor : 'transparent'
    },
    colors : ['#ea9914','#7d8fe8','#989898','#ea7070'],
    title: {
        text: ''
    },
    credits: {
      enabled: false
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Portfolio',
        colorByPoint: true, 
        data: [{
            name: 'Bitcoin',
            y: 61.41,              
        }, {
            name: 'Ethereum',
            y: 11.84
        }, {
            name: 'Litecoin',
            y: 10.85
        }, {
            name: 'Mobilink Coin',
            y: 4.67
        }]
    }]
  }; // required

  inteval : any;
  constructor(
    private electron : ElectronService, 
    private http : HttpClient,
    private chRef: ChangeDetectorRef, 
    private modalService: NgbModal,
    private apiservice : ApiService,
    public marketInfo: MarketInfo
  ) { 
    this._baseURL = AppConstants.baseURL;
  }

  ngOnInit() {
    
    this.portfolios = [
      {
        img_url : "./assets/BTC_Logo.png",
        name : 'Bitcoin',
        market : 'bitcoin',
        symbol : 'BTC',
        rate : 6489,
        cap : 113,
        volumn24 : '',
        change24 : 0.48,
        balance : 0,
        value : 0,
        portfolio : 0
      },
      {
        img_url : "./assets/ethereum.png",
        name : 'Ethereum',
        market : 'ethereum',
        symbol : 'ETH',
        rate : 205.8,
        cap : 21.2,
        volumn24 : '',
        change24 : -1.33,
        balance : 0,
        value : 0,
        portfolio : 0
      },
      {
        img_url : "./assets/LTC_Logo.png",
        name : 'Litecoin',
        market : 'litecoin',
        symbol : 'LTC',
        rate : 53.8,
        cap : 3.13,
        volumn24 : '',
        change24 : 1.05,
        balance : 0,
        value : 0,
        portfolio : 0
      },
      {
        img_url : "./assets/MOLK_Logo.png",
        name : 'Mobilink',
        market : 'mobilinktoken',
        symbol : 'MOLK',
        rate : 0.12,
        cap : '132M',
        volumn24 : '4.21K',
        change24 : -0.99,
        balance : 0,
        value : 0,
        portfolio : 0
      }
    ];                
    
    this.getData();
    this.getMarketRate();
    this.inteval = setInterval(()=>{
      this.getData();
      this.getMarketRate();
    },10000);       
    this.chRef.detectChanges();
  }

  ngOnDestroy() {
    // console.log("Leave page");
    if(this.inteval){
      clearInterval(this.inteval);
    }
  };

  getData(){
    for(let i=0;i<3;i++){
      this.apiservice.getMarketInfo(this.portfolios[i].market)
      .subscribe(data=>{
        let res:any = data;
        console.log(res);

        this.portfolios[i].rate = parseFloat(res.data.priceUsd).toFixed(2); 
        this.marketInfo.coin_prices[res.data.symbol] = this.portfolios[i].rate;

        this.portfolios[i].change24 = parseFloat(res.data.changePercent24Hr).toFixed(2);
        if(parseFloat(res.data.marketCapUsd)>=1e9)
        this.portfolios[i].cap = (parseFloat(res.data.marketCapUsd)/1e9).toFixed(2)+'B';
        else if(parseFloat(res.data.marketCapUsd)>=1e6)        
        this.portfolios[i].cap = (parseFloat(res.data.marketCapUsd)/1e6).toFixed(2)+'M';
        else if(parseFloat(res.data.marketCapUsd)>=1e3)
        this.portfolios[i].cap = (parseFloat(res.data.marketCapUsd)/1e3).toFixed(2)+'K';
        else
        this.portfolios[i].cap = parseFloat(res.data.marketCapUsd).toFixed(2);
        
        if(parseFloat(res.data.volumeUsd24Hr)>=1e9)
        this.portfolios[i].volumn24 = (parseFloat(res.data.volumeUsd24Hr)/1e9).toFixed(2)+'B';
        else if(parseFloat(res.data.marketCapUsd)>=1e6)        
        this.portfolios[i].volumn24 = (parseFloat(res.data.volumeUsd24Hr)/1e6).toFixed(2)+'M';
        else if(parseFloat(res.data.marketCapUsd)>=1e3)
        this.portfolios[i].volumn24 = (parseFloat(res.data.volumeUsd24Hr)/1e3).toFixed(2)+'K';
        else
        this.portfolios[i].volumn24 = parseFloat(res.data.volumeUsd24Hr).toFixed(2);
        
      })
    }
  }
  
  openModal(content){
    this.modalService.open(content, { centered: true });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  private getMarketRate() {
    if(!this.marketInfo.market_rate) {
      this.http.get(this._baseURL + '/market/rate')
      .subscribe(
        data => {
          let res: any = data;
          this.marketInfo.market_rate = res.rate;
      });
    }
  }
}
