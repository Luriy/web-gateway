import { Component } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';
import { UserService } from '../user.service';

@Component({
  selector: 'app-settings-overlay',
  templateUrl: './settings-overlay.component.html',
  styleUrls: ['./settings-overlay.component.scss']
})
export class SettingsOverlayComponent {

  public userRole: UserService['role'];

  constructor(private overlayRef: OverlayRef, userService: UserService) {
    this.userRole = userService.role;
  }

  close(): void {
    this.overlayRef.dispose();
  }

}
