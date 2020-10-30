import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsOverlayComponent } from './settings-overlay.component';
import { OverlayRef } from '@angular/cdk/overlay';

describe('SettingsOverlayComponent', () => {
  let component: SettingsOverlayComponent;
  let fixture: ComponentFixture<SettingsOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsOverlayComponent ],
      providers: [ { provide: OverlayRef, useValue: null } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
