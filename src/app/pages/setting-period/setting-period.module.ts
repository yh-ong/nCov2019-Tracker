import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingPeriodPageRoutingModule } from './setting-period-routing.module';

import { SettingPeriodPage } from './setting-period.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingPeriodPageRoutingModule
  ],
  declarations: [SettingPeriodPage]
})
export class SettingPeriodPageModule {}
