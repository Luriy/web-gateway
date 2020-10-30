import { Component, Injector, OnInit } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { SettingsOverlayComponent } from './settings-overlay/settings-overlay.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private injector: Injector, private overlay: Overlay) {}

    public ngOnInit(): void {
        const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();
        const overlayRef = this.overlay.create({
            hasBackdrop: true,
            height: '400px',
            positionStrategy,
            width: '600px',
        });
        const tokens = new WeakMap([ [ OverlayRef, overlayRef ] ]);
        const portalInjector = new PortalInjector(this.injector, tokens);
        const userProfilePortal = new ComponentPortal(SettingsOverlayComponent, null, portalInjector);

        // overlayRef.attach(userProfilePortal);
    }

}
