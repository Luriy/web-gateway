import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSettingsOverlayComponent } from './client-settings-overlay.component';

describe('ClientSettingsOverlayComponent', () => {
  let component: ClientSettingsOverlayComponent;
  let fixture: ComponentFixture<ClientSettingsOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientSettingsOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientSettingsOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
