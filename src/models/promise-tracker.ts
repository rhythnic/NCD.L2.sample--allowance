import { Ref, ref } from "vue";

export enum PromiseStatus {
  READY,
  RUNNING,
  LONG_RUNNING,
  SUCCEEDED,
  FAILED,
}

interface PromiseTrackerOptions {
  uiDelay?: number;
}

const defaultPromiseTrackerOptions = {
  uiDelay: 1000,
};

export class PromiseTracker {
  private opts: PromiseTrackerOptions;
  public status: Ref<PromiseStatus>;
  public error: Error | null = null;

  public static create(opts?: PromiseTrackerOptions) {
    return new PromiseTracker(opts);
  }

  constructor(opts?: PromiseTrackerOptions) {
    this.opts = Object.assign({}, opts, defaultPromiseTrackerOptions);
    this.status = ref(PromiseStatus.READY);
  }

  get isReady() {
    return this.status.value === PromiseStatus.READY;
  }

  get isRunning() {
    return (
      this.status.value === PromiseStatus.RUNNING ||
      this.status.value === PromiseStatus.LONG_RUNNING
    );
  }

  get isLongRunning() {
    return this.status.value === PromiseStatus.LONG_RUNNING;
  }

  get succeeded() {
    return this.status.value === PromiseStatus.SUCCEEDED;
  }

  get failed() {
    return this.status.value === PromiseStatus.FAILED;
  }

  track(promise: Promise<any>): Promise<any> {
    this.status.value = PromiseStatus.RUNNING;
    const timerId = setTimeout(() => {
      this.status.value = PromiseStatus.LONG_RUNNING;
    }, this.opts.uiDelay);
    return promise
      .then((data) => {
        clearTimeout(timerId);
        this.status.value = PromiseStatus.SUCCEEDED;
        return data;
      })
      .catch((error) => {
        clearTimeout(timerId);
        this.error = error;
        this.status.value = PromiseStatus.FAILED;
      });
  }

  reset(): void {
    this.status.value = PromiseStatus.READY;
    this.error = null;
  }
}
