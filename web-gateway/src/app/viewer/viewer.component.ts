import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {MillicastService} from '../millicast/millicast.service';
import {MillicastStream} from '../millicast/millicast-stream';

type ViewerState = 'init' |     // Initial state before we load the stream.
  'loading' |   // When we are loading the stream
  'waiting' |   // Waiting for broadcaster to begin streaming
  'playing' |   // Stream is playing
  'stopped' |   // User stopped stream
  'ready' |     // Stream has loaded but it cannot be autoplayed. The stream is ready to be played by the user.
  'inactive' |  // Stream is inactive, broadcaster has stopped broadcast.
  'error';      // There was an error loading or playing the stream.

/**
 * Component for the main remote stream viewer.
 */
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  providers: []
})
export class ViewerComponent implements AfterViewInit {

  @ViewChild('video')
  private video!: ElementRef;

  @ViewChild('container')
  private container!: ElementRef;

  private stream!: MillicastStream;

  state: ViewerState = 'init';
  timerId = -1;
  timeSinceStartOfStream = 0;

  constructor(private millicast: MillicastService) {
  }

  // We must use [ngAfterViewInit] because we need to be sure that @ViewChild('video') is defined before loading stream
  ngAfterViewInit(): void {
    this.loadStream().catch(error => {
      if (error.code === 400) {
        // if we get a 400 on the first request then it means the broadcaster has not begun streaming, go to 'waiting' state.
        // try to subscribe until the broadcaster begins streaming
        this.state = 'waiting';
        this.loadStream(Infinity);
      } else {
        console.error(error);
        this.state = 'error';
      }
    });
  }

  private async loadStream(maxSubscribeRetries: number = 0): Promise<void> {
    // First Subscribe to Stream
    const subscription = await this.millicast.subscribe(maxSubscribeRetries);

    // If subscription is successful, then close the last stream.
    // We want to maintain last stream open until we obtain a new subscription in case the stream goes from 'inactive' to 'active' state.
    if (this.stream) {
      this.stream.close();
    }
    // Then Load Stream
    this.state = 'loading';
    this.stream = await this.millicast.loadStream(subscription);
    this.video.nativeElement.srcObject = this.stream.src();
    this.video.nativeElement.load();

    // Handle stream state changes
    this.stream.onStateChanged((isActive: boolean) => {
      if (isActive) {
        this.play();
      } else {
        this.inactivate();
      }
    });
    // Try to play stream immediately
    this.play();
  }

  play(): void {
    // Try to autoplay, if it fails then move to 'ready' state where we wait for the user to click 'Play'.
    this.video.nativeElement.play().then(() => {
      this.state = 'playing';
      this.timeSinceStartOfStream = 0;
      this.startTimer();
    }).catch(() => {
      this.state = 'ready';
    });
  }

  stop(): void {
    this.video.nativeElement.pause();
    this.state = 'stopped';
    this.cancelTimer();
  }

  inactivate(): void {
    this.state = 'inactive';
    this.cancelTimer();
  }

  refresh(): void {
    this.stop();
    this.loadStream().catch(error => {
      if (error.code === 400) {
        this.state = 'inactive';
      } else {
        console.error(error);
        this.state = 'error';
      }
    });
  }

  fullscreen(): void {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      this.container.nativeElement.requestFullscreen();
    }
  }

  isStreamLoaded(): boolean {
    return [
      'playing',
      'stopped',
      'ready'
    ].indexOf(this.state) !== -1;
  }

  private startTimer(): void {
    this.cancelTimer(); // Make sure previous timer was canceled

    const start = performance.now();
    const timer = (current: number): void => {
      this.timeSinceStartOfStream = current - start;
      this.timerId = window.requestAnimationFrame(timer);
    };
    timer(start);
  }

  private cancelTimer(): void {
    window.cancelAnimationFrame(this.timerId);
  }
}
