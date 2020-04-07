import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingPeriodPage } from './setting-period.page';

describe('SettingPeriodPage', () => {
  let component: SettingPeriodPage;
  let fixture: ComponentFixture<SettingPeriodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingPeriodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingPeriodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
