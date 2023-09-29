import Notiflix from 'notiflix';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

let clickDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');

      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
    clickDate = selectedDates[0].getTime();
  },
};

flatpickr('#datetime-picker', options);

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysTimer: document.querySelector('[data-days]'),
  hoursTimer: document.querySelector('[data-hours]'),
  minutesTimer: document.querySelector('[data-minutes]'),
  secondsTimer: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', handleTimer);

function handleTimer() {
  const pickedDate = clickDate;
  const startTimer = setInterval(() => {
    const deltaTime = pickedDate - Date.now();
    if (deltaTime < 1000) {
      clearInterval(startTimer);
    }
    const timeLeft = convertMs(deltaTime);
    updateTimer(timeLeft);
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysTimer.textContent = addLeadingZero(days);
  refs.hoursTimer.textContent = addLeadingZero(hours);
  refs.minutesTimer.textContent = addLeadingZero(minutes);
  refs.secondsTimer.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
