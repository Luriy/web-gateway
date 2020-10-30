import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostSettingsOverlayComponent } from './host-settings-overlay.component';

describe('HostSettingsOverlayComponent', () => {
  let component: HostSettingsOverlayComponent;
  let fixture: ComponentFixture<HostSettingsOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostSettingsOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostSettingsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
