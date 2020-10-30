import {MillicastSignalingChannel} from './millicast-signaling-channel';
import {MillicastWebRTCChannel} from './millicast-webrtc-channel';
import {MillicastSubscription} from './millicast.service';

type StateChangedCallback = (isActive: boolean) => void;

/**
 * Represents a Millicast stream.
 */
export class MillicastStream {
  private stream: MediaStream = new MediaStream();
  private stateChangedCallbacks: StateChangedCallback[] = [];
  private webrtc!: MillicastWebRTCChannel;
  private signaling!: MillicastSignalingChannel;

  constructor(private streamName: string) {
  }

  async load(subscription: MillicastSubscription): Promise<MillicastStream> {
    this.webrtc = new MillicastWebRTCChannel();
    this.signaling = new MillicastSignalingChannel(subscription);
    await this.signaling.connect({
      onSignalEvent: eventName => {
        this.stateChangedCallbacks.forEach(callback => callback(eventName === 'active'));
      }
    });
    const localOffer = await this.webrtc.createOffer();
    await this.webrtc.setLocalDescription(localOffer);
    const remoteOffer = await this.signaling.getRemoteOffer(localOffer, this.streamName);
    this.stream = await this.webrtc.getStream(remoteOffer);
    return this;
  }

  onStateChanged(callback: StateChangedCallback): void {
    this.stateChangedCallbacks.push(callback);
  }

  src(): MediaStream {
    return this.stream;
  }

  close(): void {
    if (this.signaling) {
      this.signaling.close();
    }
    if (this.webrtc) {
      this.webrtc.close();
    }
  }

}
