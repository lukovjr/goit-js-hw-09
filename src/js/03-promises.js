import Notiflix from 'notiflix';

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
      
    }, delay)
    })
};
const formEl = document.querySelector('form');

let position = 0;

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
 
  let delay = Number(event.target.elements.delay.value);
  let step = Number(event.target.elements.step.value);
  let amount = event.target.elements.amount.value;


    for (let i = 0; i < amount; i += 1) {
      position += 1;
      
      createPromise(position, delay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`,{
    timeout: 4000,
  });
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`,{
    timeout: 4000,
  });
        })
      delay += step;
    }
  position = 0;
}
);