import { HomeComponent } from './components/home/home.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletComponent } from './components/wallet/wallet.component';
import { BackupComponent } from './components/backup/backup.component';
import { ChartComponent } from './components/chart/chart.component';
import { AssetsComponent } from './components/assets/assets.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'exchange',
        component: ExchangeComponent
    },
    {
        path: 'wallet',
        component: WalletComponent
    },
    {
        path: 'backup',
        component: BackupComponent
    },
    {
        path : 'chart',
        component: ChartComponent
    },
    {
        path : 'assets',
        component: AssetsComponent
    },
    {
        path : 'settings',
        component: SettingsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
