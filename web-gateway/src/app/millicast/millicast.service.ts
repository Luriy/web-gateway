import {Inject, Injectable} from '@angular/core';
import {MillicastStream} from './millicast-stream';
import {PromiseRetrier} from '../utils/promise-retrier';

const API_URL_SUBSCRIBE = 'https://director.millicast.com/api/director/subscribe';

export interface MillicastSubscription {
  wsUrl: string;
  jwt: string;
}

/**
 * Used to obtain Millicast stream. Flow is the following:
 *  1. Obtain subscription by calling /subscribe endpoint. This returns a WebSocket URL and a JWT, used in step 2.
 *  2. Open WebSocket with Millicast for signaling.
 *  3. CreateOffer (SDP) locally, send this offer over WebSocket signaling channel
 *  4. Receive remote offer (SDP)
 *  5. MediaStream track is added to webrtc connection.
 *  6. At this point we may receive additional events over signaling channel with information of stream state, ie: 'active', 'inactive'.
 */
@Injectable({
  providedIn: 'root'
})
export class MillicastService {

  constructor(@Inject('millicastAccountId') private accountId: string,
              @Inject('millicastStreamName') private streamName: string) {
  }

  loadStream(subscription: MillicastSubscription): Promise<MillicastStream> {
    return new MillicastStream(this.streamName).load(subscription);
  }

  subscribe(maxRetries: number): Promise<MillicastSubscription> {
    const doSubscribe: () => Promise<MillicastSubscription> = () => new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', API_URL_SUBSCRIBE, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            resolve({
              wsUrl: response.data.urls[0],
              jwt: response.data.jwt
            });
          } else {
            reject({
              code: xhr.status,
              message: xhr.responseText
            });
          }
        }
      };
      xhr.send(JSON.stringify({
        streamAccountId: this.accountId,
        streamName: this.streamName,
        unauthorizedSubscribe: true
      }));
    });

    if (maxRetries === 0) {
      return doSubscribe();
    } else {
      return new PromiseRetrier({
        delayMillis: 2000,
        maxRetries
      }).retry(doSubscribe);
    }
  }
}
