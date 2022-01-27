/**
 * Composables for common UI patterns
 */

import { ref, readonly, Ref, DeepReadonly } from "vue";

export function useState<T>(
  initial: T,
): [Ref<DeepReadonly<T>>, (arg0: T) => void] {
  const state = ref(initial) as Ref<T>;

  function setState(val: T): void {
    state.value = val;
  }

  return [readonly(state), setState];
}

export enum ActionStatus {
  Ready,
  Running,
  LongRunning,
  Succeeded,
  Failed,
}

interface UseActionOptions {
  uiDelay?: number;
}

const defaultUseActionOptions = {
  uiDelay: 1000,
};

export function useAction(opts: UseActionOptions = defaultUseActionOptions) {
  const status = ref<ActionStatus>(ActionStatus.Ready);
  const error = ref<Error | undefined>();

  function track(promise: Promise<any>): Promise<any> {
    status.value = ActionStatus.Running;
    const timerId = setTimeout(() => {
      status.value = ActionStatus.LongRunning;
    }, opts.uiDelay);
    return promise
      .then((data) => {
        clearTimeout(timerId);
        status.value = ActionStatus.Succeeded;
        return data;
      })
      .catch((error) => {
        clearTimeout(timerId);
        error.value = error;
        status.value = ActionStatus.Failed;
      });
  }

  function reset(): void {
    status.value = ActionStatus.Ready;
    error.value = undefined;
  }

  return {
    status: readonly(status),
    error: readonly(error),
    track,
    reset,
  };
}
