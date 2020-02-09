const WEATHER_DATA = [
  {
    date: 1581034541000,
    temperature: {
      night: -7,
      day: -14,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: false,
  },
  {
    date: 1581120941000,
    temperature: {
      night: -9,
      day: -14,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: false,
  },
  {
    date: 1581207341000,
    temperature: {
      night: -14,
      day: -19,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: false,
  },
  {
    date: 1581293741000,
    temperature: {
      night: -5,
      day: -16,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: false,
  },
  {
    date: 1581380141000,
    temperature: {
      night: -5,
      day: -9,
    },
    cloudiness: 'Солнечно',
    snow: false,
    rain: false,
  },
  {
    date: 1581466541000,
    temperature: {
      night: -5,
      day: -10,
    },
    cloudiness: 'Солнечно',
    snow: false,
    rain: false,
  },
  {
    date: 1581552941000,
    temperature: {
      night: -5,
      day: -8,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: false,
  },
  {
    date: 1581639341000,
    temperature: {
      night: -5,
      day: -8,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: false,
  },
  {
    date: 1581725741000,
    temperature: {
      night: 0,
      day: -6,
    },
    cloudiness: 'Облачно',
    snow: false,
    rain: true,
  },
  {
    date: 1581812141000,
    temperature: {
      night: -1,
      day: -5,
    },
    cloudiness: 'Облачно',
    snow: false,
    rain: false,
  },
];

const DAYS_OF_WEEK = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
const MONTS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const H1 = document.querySelector('h1');
const NOW = new Date();
const DAYS_BLOCK = document.querySelector('.days-of-week');

H1.append(NOW.getDate() + " " + MONTS[NOW.getMonth()] + ", " + DAYS_OF_WEEK[NOW.getDay()]);

function addDayInList(day) {
    let li = document.createElement('li');
    let date = new Date(day.date);
    let overhead = document.createElement('div');
    overhead.classList.add('overhead');
    if (NOW.getDate() == date.getDate()) {
        overhead.textContent = 'сегодня';
    } else {
        overhead.textContent = DAYS_OF_WEEK[date.getDay()];
    }
    li.appendChild(overhead);
    let title = document.createElement('div');
    title.textContent = date.getDate() + " " + MONTS[date.getMonth()];
    title.classList.add('title-date');
    li.appendChild(title);
    let image = document.createElement('img');
    let cloudy = 'солнечно';
    let fall = 'без осадков';
    image.src = 'images/sun.png'
    if (day.snow) {
        fall = 'снег';
        image.src = 'images/snow.png'
    }
    if (day.rain) {
        fall = 'дождь';
        image.src = 'images/rain.png'
    }
    if (day.cloudiness === 'Облачно') {
        if (day.rain || day.snow) {
            cloudy = 'облачно';
        } else {
            cloudy = 'облачно';
            image.src = 'images/cloud.png'
        }
    }
    li.appendChild(image);
    let dayTemp = document.createElement('div');
    dayTemp.textContent = "днем " + day.temperature.day + "\xB0";
    dayTemp.classList.add('day-temp');
    let nightTemp = document.createElement('div');
    nightTemp.textContent = "ночью " + day.temperature.night + "\xB0";
    nightTemp.classList.add('night-temp');
    li.appendChild(dayTemp);
    li.appendChild(nightTemp);
    let description = document.createElement('div');
    description.classList.add('description');
    description.innerHTML = cloudy + "," + "</br>" + fall;
    li.appendChild(description);
    DAYS_BLOCK.appendChild(li);
}

function createDisplayData(numberOfDisplayedDays) {
    let today;
    for (let i = 0; i < WEATHER_DATA.length; i++) {
        let tempDate = new Date(WEATHER_DATA[i].date);
        if (tempDate.getDate() == NOW.getDate()) {
            today = i;
        }
    }
    let lastDay;
    let daysData = WEATHER_DATA.length - today + 1;
    if (daysData <= numberOfDisplayedDays) {
        lastDay = today + daysData;
    } else {
        lastDay = today + numberOfDisplayedDays;
    }
    let dataForOutput = WEATHER_DATA.slice(today, lastDay);
    for (let i = 0; i < dataForOutput.length; i++) {
        addDayInList(dataForOutput[i]);
    }
    return dataForOutput.length;
}

const COUNT_OF_DAYS = createDisplayData(5);

const WEATHER_BLOCK = document.querySelector('.weather-block');
const LIST = WEATHER_BLOCK.querySelector('ul');
const LIST_ITEMS = WEATHER_BLOCK.querySelectorAll('li');
const WIDTH = 160;
const PREV = WEATHER_BLOCK.querySelector('.prev');
const NEXT = WEATHER_BLOCK.querySelector('.next');
if (LIST_ITEMS.length < 5) {
    NEXT.classList.add("unavailable");
}
PREV.classList.add("unavailable");
let position = 0;
LIST.style.marginLeft = position + 'px';

PREV.onclick = function() {
    position += WIDTH;
    if (position == 0) {
        PREV.classList.add("unavailable");
    }
    position = Math.min(position, 0);
    LIST.style.marginLeft = position + 'px';
    if (!(COUNT_OF_DAYS < 5)) {
        NEXT.classList.remove("unavailable");
    }
    if (position <= -WIDTH * (LIST_ITEMS.length - 4)) {
        NEXT.classList.add("unavailable");
    }
};

NEXT.onclick = function() {
    position -= WIDTH;
    if (position == (-WIDTH * (LIST_ITEMS.length - 4))) {
        NEXT.classList.add("unavailable");
    }
    position = Math.max(position, -WIDTH * (LIST_ITEMS.length - 4));
    LIST.style.marginLeft = position + 'px';
    if (!(COUNT_OF_DAYS.length < 5)) {
        PREV.classList.remove("unavailable");
    }
};
