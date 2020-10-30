import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { AppComponent } from './app.component';
import { ViewerModule } from './viewer/viewer.module';
import { SettingsOverlayModule } from './settings-overlay/settings-overlay.module';
import { VideoChatModule } from './video-chat/video-chat.module';
import { ChatDetailComponent } from './components/chat-detail/chat-detail.component';

const streamName = (() => {
  // TODO: obtain these from current logged in user. This function is temporary.
  return new URLSearchParams(window.location.search).get('streamName');
})();

@NgModule({
  declarations: [
    AppComponent,
    ChatDetailComponent
  ],
  imports: [
    BrowserModule,
    OverlayModule,
    SettingsOverlayModule,
    VideoChatModule,
    ViewerModule
  ],
  providers: [
    {provide: 'millicastAccountId', useValue: 'Mehc3n'},
    {provide: 'millicastStreamName', useValue: streamName}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
