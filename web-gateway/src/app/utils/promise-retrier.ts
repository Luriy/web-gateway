interface PromiseRetrierConfiguration {
  delayMillis: number;
  maxRetries: number;
}

export class PromiseRetrier {
  constructor(private config: PromiseRetrierConfiguration) {
  }

  retry<T>(promise: () => Promise<T>, retryCount: number = 0): Promise<T> {
    return new Promise((resolve, reject) => {
        // tslint:disable-next-line:no-any
        const doRetry = (error: any) => {
          if (retryCount < this.config.maxRetries) {
            setTimeout(() => {
              this.retry(promise, retryCount + 1).then(resolve);
            }, this.config.delayMillis);
          } else {
            reject(error);
          }
        };
        promise().then(resolve).catch(doRetry);
      }
    );
  }
}

