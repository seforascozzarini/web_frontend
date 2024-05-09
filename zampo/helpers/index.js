 /**
* perform a linear interpolation between two values `start` and end `over` a `duration` of time.
* Everytime the value is updated, the `onUpdate` callback is called with the new value.
* When the lerp is finished, the `onFinish` callback is called.
* @param {Object} options 
* @param {Number} options.start 
* @param {Number} options.end 
* @param {Number} options.duration 
* @param {Function} options.onUpdate
* @param {Function} options.onFinish 
*/
export function lerp({ start, end, duration, onUpdate, onFinish }) {
    const _lerp = (start, end, progress) => start + progress * (end - start);
    let startTime;
    const update = () => {
        const currentTime = Date.now();
        const elapsed = (currentTime - startTime) / 1000;

       if (elapsed < duration) {
           const progress = elapsed / duration;
           const lerpedValue = _lerp(start, end, progress);

           onUpdate(lerpedValue);
           requestAnimationFrame(update);
       } else {
           onUpdate(end);
           onFinish()
       }
   }
   function startLerp() {
       startTime = Date.now();
       requestAnimationFrame(update);
   }

   // Start the lerp
   startLerp();
}

export function currentLocale() {
    const lan = useI18n()
    return {
        code: lan.locale.value,
        iso: lan.locales.value.find(l => l.code === lan.locale.value).iso,
    }
}
