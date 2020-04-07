import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingPeriodPage } from './setting-period.page';

const routes: Routes = [
  {
    path: '',
    component: SettingPeriodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingPeriodPageRoutingModule {}
