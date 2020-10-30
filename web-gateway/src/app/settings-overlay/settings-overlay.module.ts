import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsOverlayComponent } from './settings-overlay.component';
import { ClientSettingsOverlayComponent } from './client-settings-overlay/client-settings-overlay.component';
import { HostSettingsOverlayComponent } from './host-settings-overlay/host-settings-overlay.component';



@NgModule({
  declarations: [SettingsOverlayComponent, ClientSettingsOverlayComponent, HostSettingsOverlayComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SettingsOverlayComponent
  ]
})
export class SettingsOverlayModule { }
