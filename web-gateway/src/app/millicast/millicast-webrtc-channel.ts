/**
 * Implements WebRTC protocol with Millicast
 */
export class MillicastWebRTCChannel {

  private connection: RTCPeerConnection;

  constructor() {
    this.connection = new RTCPeerConnection({
      rtcpMuxPolicy: 'require',
      bundlePolicy: 'max-bundle'
    });
    if (this.connection.addTransceiver) {
      // Create dummy stream
      const stream = new MediaStream();
      // Create all the receiver tracks
      this.connection.addTransceiver('audio', {
        direction: 'recvonly',
        streams: [stream]
      });
      this.connection.addTransceiver('video', {
        direction: 'recvonly',
        streams: [stream]
      });
    }
  }

  setLocalDescription(offer: RTCSessionDescriptionInit): Promise<void> {
    return this.connection.setLocalDescription(offer);
  }

  async createOffer(): Promise<RTCSessionDescriptionInit> {
    return this.connection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    });
  }

  getStream(remoteSDP: string): Promise<MediaStream> {
    const answer = new RTCSessionDescription({
      type: 'answer',
      sdp: remoteSDP + 'a=x-google-flag:conference\r\n'
    });
    return new Promise((resolve) => {
      this.connection.ontrack = event => {
        resolve(event.streams[0]);
      };
      this.connection.setRemoteDescription(answer);
    });
  }

  close(): void {
    this.connection.close();
  }
}
