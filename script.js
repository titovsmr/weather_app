let weatherData = [
  {
    date: 1580240187000,
    temperature: {
      night: -6,
      day: -10,
    },
    cloudiness: 'Ясно',
    snow: false,
    rain: false,
  },
  {
    date: 1580326587000,
    temperature: {
      night: -8,
      day: -14,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: false,
  },
  {
    date: 1580412987000,
    temperature: {
      night: 0,
      day: -9,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: false,
  },
  {
    date: 1580499387000,
    temperature: {
      night: -1,
      day: -3,
    },
    cloudiness: 'Облачно',
    snow: false,
    rain: false,
  },
  {
    date: 1580585787000,
    temperature: {
      night: -3,
      day: -5,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: false,
  },
  {
    date: 1580672187000,
    temperature: {
      night: -3,
      day: -4,
    },
    cloudiness: 'Облачно',
    snow: false,
    rain: false,
  },
  {
    date: 1580758587000,
    temperature: {
      night: +1,
      day: -2,
    },
    cloudiness: 'Облачно',
    snow: false,
    rain: true,
  },
  {
    date: 1580844987000,
    temperature: {
      night: 0,
      day: -2,
    },
    cloudiness: 'Облачно',
    snow: true,
    rain: false,
  },
  {
    date: 1580931387000,
    temperature: {
      night: -2,
      day: -5,
    },
    cloudiness: 'Солнечно',
    snow: false,
    rain: false,
  },
  {
    date: 1581017787000,
    temperature: {
      night: -6,
      day: -9,
    },
    cloudiness: 'Облачно',
    snow: false,
    rain: false,
  },
];

let daysOfWeek = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
let monts = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
let h1 = document.querySelector('h1');
let now = new Date(1581017787000);
let daysBlock = document.querySelector('.days-of-week');

h1.append(now.getDate() + " " + monts[now.getMonth()] + ", " + daysOfWeek[now.getDay()]);

let addDayInList = function(day) {
    let li = document.createElement('li');
    let date = new Date(day.date);
    let overhead = document.createElement('div');
    overhead.classList.add('overhead');
    if (now.getDate() == date.getDate()) {
        overhead.textContent = 'сегодня';
    } else {
        overhead.textContent = daysOfWeek[date.getDay()];
    }
    li.appendChild(overhead);
    let title = document.createElement('div');
    title.textContent = date.getDate() + " " + monts[date.getMonth()];
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
    daysBlock.appendChild(li);
};

let dayNumber;
for (let i = 0; i < weatherData.length; i++) {
    let tempDate = new Date(weatherData[i].date);
    if (tempDate.getDate() == now.getDate()) {
        dayNumber = i;
    }
}
let start;
let end;
let firstDay;
if (dayNumber >= 3) {
    start = dayNumber - 3;
    firstDay = 3;
} else {
    start = 0;
    firstDay = dayNumber;
}

if ((weatherData.length - (dayNumber + 1)) >= 3) {
    end = dayNumber + 4;
} else {
    end = weatherData.length;
}

let dataForOutput = weatherData.slice(start, end);

for (let i = 0; i < dataForOutput.length; i++) {
    addDayInList(dataForOutput[i]);
}

let weatherBlock = document.querySelector('.weather-block');
let list = weatherBlock.querySelector('ul');
let listItems = weatherBlock.querySelectorAll('li');
let width = 160;
let position = firstDay * -width;
list.style.marginLeft = position + 'px';
let prev = weatherBlock.querySelector('.prev');
let next = weatherBlock.querySelector('.next');
next.classList.add("unavailable");
if (dayNumber == 0) {
    prev.classList.add("unavailable");
}

weatherBlock.querySelector('.prev').onclick = function() {
    position += width;
    if (position == 0) {
        prev.classList.add("unavailable");
    }
    position = Math.min(position, 0);
    list.style.marginLeft = position + 'px';
    if (!(dataForOutput.length < 5)) {
        next.classList.remove("unavailable");
    }
    if (position <= -width * (listItems.length - 4)) {
        next.classList.add("unavailable");
    }
};

weatherBlock.querySelector('.next').onclick = function() {
    position -= width;
    if (position == (-width * (listItems.length - 4))) {
        next.classList.add("unavailable");
    }
    position = Math.max(position, -width * (listItems.length - 4));
    list.style.marginLeft = position + 'px';
    if (!(dataForOutput.length < 5)) {
        prev.classList.remove("unavailable");
    }
};