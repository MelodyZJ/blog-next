import raf from 'rc-util/lib/raf';

/**
 * 使用动画帧进行节流处理
 *
 * @param fn 需要进行节流处理的函数
 * @returns 返回节流处理后的函数
 */
export function throttleByAnimationFrame(fn: (...args: any[]) => void) {
    let requestId: number | null;

    const later = (args: any[]) => () => {
        requestId = null;
        fn(...args);
    };

    const throttled = (...args: any[]) => {
        if (requestId == null) {
            requestId = raf(later(args));
        }
    };

    (throttled as any).cancel = () => raf.cancel(requestId!);

    return throttled;
}

/**
 * 使用 requestAnimationFrame 节流函数的装饰器
 *
 * @returns 返回一个节流函数
 */
export function throttleByAnimationFrameDecorator() {
    return function throttle(target: any, key: string, descriptor: any) {
        const fn = descriptor.value;
        let definingProperty = false;
        return {
            configurable: true,
            get() {
                // In IE11 calling Object.defineProperty has a side-effect of evaluating the
                // getter for the property which is being replaced. This causes infinite
                // recursion and an "Out of stack space" error.
                // eslint-disable-next-line no-prototype-builtins
                if (
                    definingProperty ||
                    this === target.prototype ||
                    this.hasOwnProperty(key)
                ) {
                    /* istanbul ignore next */
                    return fn;
                }

                const boundFn = throttleByAnimationFrame(fn.bind(this));
                definingProperty = true;
                Object.defineProperty(this, key, {
                    value: boundFn,
                    configurable: true,
                    writable: true,
                });
                definingProperty = false;
                return boundFn;
            },
        };
    };
}
