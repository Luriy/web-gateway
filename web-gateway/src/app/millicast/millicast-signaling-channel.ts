import {MillicastSubscription} from './millicast.service';

interface ConnectArguments {
  onSignalEvent: (eventName: string) => void;
}

/**
 * Used to communicate with Millicast over a WebSocket signaling channel
 */
export class MillicastSignalingChannel {

  private onMessageHandler: (evt: MessageEvent) => void;
  private ws?: WebSocket;

  constructor(private subscription: MillicastSubscription) {
    this.onMessageHandler = (evt) => {
    };
  }

  async connect({onSignalEvent}: ConnectArguments): Promise<void> {
    return new Promise((resolve) => {
      if (this.ws) {
        this.ws.close();
      }
      this.ws = new WebSocket(this.subscription.wsUrl + '?token=' + this.subscription.jwt);
      this.ws.onopen = () => {
        resolve();
      };
      this.ws.onmessage = (evt: MessageEvent) => {
        const message = JSON.parse(evt.data);
        if (message.type === 'event') {
          onSignalEvent(message.name);
        }
        this.onMessageHandler(message);
      };
    });
  }


  async getRemoteOffer(localOffer: RTCSessionDescriptionInit, streamName: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
        reject('Millicast signaling WebSocket is not open');
      } else {
        this.onMessageHandler = (message => {
          if (message.type === 'response') {
            resolve(message.data.sdp);
          }
        });
        this.ws.send(JSON.stringify({
          type: 'cmd',
          transId: 0,
          name: 'view',
          data: {
            streamId: streamName,
            sdp: localOffer.sdp
          }
        }));
      }
    });
  }

  close(): void {
    if (this.ws) {
      this.ws.close();
    }
  }

}
