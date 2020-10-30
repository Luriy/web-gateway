import { Component, ElementRef, ViewChild } from '@angular/core';

// TODO: remove all liveswitch assets
declare var chat: any; // tslint:disable-line:no-any

@Component({
  selector: 'app-video-chat',
  templateUrl: './video-chat.component.html',
  styleUrls: ['./video-chat.component.scss']
})
export class VideoChatComponent {

  @ViewChild('videoChat')
  private videoChat!: ElementRef;

  public isJoining = false;

  public join(): void {
    this.isJoining = true;
    const app = new chat.App();

    app.startLocalMedia(this.videoChat.nativeElement)
      .then(
        () => {
          // TODO: replace the random string with the real user name
          app.setUserName(`${ Math.random().toString().slice(2) }`);
          app.joinAsync(() => { }, () => { }, () => { }, () => { })
            .then(() => { }, (err: any) => console.error(err)); // tslint:disable-line:no-any
        },
        (err: any) => console.error(err) // tslint:disable-line:no-any
      );
  }

}
