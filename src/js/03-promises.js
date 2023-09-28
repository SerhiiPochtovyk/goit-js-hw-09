import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  formEl: document.querySelector('.form'),
  buttonEl: document.querySelector('.js-btn-submit'),
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

refs.formEl.addEventListener('submit', event => {
  event.preventDefault();
  let delay = Number(refs.formEl.elements.delay.value);
  const step = Number(refs.formEl.elements.step.value);
  const amount = Number(refs.formEl.elements.amount.value);
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
  }
});
