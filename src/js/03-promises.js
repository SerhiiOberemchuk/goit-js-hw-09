import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  const onFormSubmitDataShow = {};
  const data = new FormData(event.currentTarget);
  data.forEach((value, name) => {
    onFormSubmitDataShow[name.trim()] = value.trim();
  });
  let amount = Number(onFormSubmitDataShow.amount);
  let delay = Number(onFormSubmitDataShow.delay);
  let step = Number(onFormSubmitDataShow.step);

  if (amount < 0 || delay < 0 || step < 0) {
    Notiflix.Notify.warning("Значення не можуть бути від'ємними.");
    return;
  }

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        res({ position, delay });
      } else {
        // Reject
        rej({ position, delay });
      }
    }, delay);
  });
}
