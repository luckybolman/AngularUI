import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule, MatSelectModule,
  MatFormFieldModule, MatInputModule, MatButtonToggleModule, MatDatepickerModule, MatSnackBarModule
} from '@angular/material';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ElectronService } from './providers/electron.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { WalletComponent } from './components/wallet/wallet.component';
import { BackupComponent } from './components/backup/backup.component';
import { UserInfo, MarketInfo, CoinInfo } from './components/globaldata';

import { DataTablesModule } from 'angular-datatables';
import  { HighchartsChartModule} from 'highcharts-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { ChartComponent } from './components/chart/chart.component';
import { AssetsComponent } from './components/assets/assets.component';
import { SettingsComponent } from './components/settings/settings.component';

import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/primeng';
import { PanelModule } from 'primeng/primeng';
import { RadioButtonModule } from 'primeng/primeng';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    SideMenuComponent,
    ExchangeComponent,
    WalletComponent,
    BackupComponent,
    ChartComponent,
    AssetsComponent,
    SettingsComponent
  ],
  imports: [
    HighchartsChartModule,
    ButtonModule,
    DataTablesModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSnackBarModule,
    BsDropdownModule.forRoot(),
    NgbModule.forRoot(),
    AccordionModule,
    BrowserModule,
    PanelModule,
    RadioButtonModule,
    ToastModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  exports : [
    SideMenuComponent
  ],
  providers: [ElectronService, UserInfo, MarketInfo, CoinInfo],
  bootstrap: [AppComponent]
})
export class AppModule { }
