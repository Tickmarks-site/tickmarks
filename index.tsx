// --- Data Sources ---
const today = new Date();
const currentMonth = today.getMonth() + 1; // Month as 1-12
const currentDay = today.getDate();

const employeeBirthdays = [
  { name: 'Jane Doe', month: currentMonth, day: currentDay + 2 > 28 ? 5 : currentDay + 2 },
  { name: 'John Smith', month: currentMonth, day: currentDay },
  { name: 'Peter Jones', month: 1, day: 15 },
];

const corporateEvents = [
  { title: 'Project Kick-off', month: currentMonth, day: 10 },
  { title: 'Q3 Report Deadline', month: currentMonth, day: 22 },
  { title: 'Town Hall Meeting', month: currentMonth, day: currentDay },
];

// --- App Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  renderCalendar();
  checkBirthdays();
  renderNewsFeed();
});

// --- Functions ---

function displayEventsForDay(day, month, year) {
  const calendarEventsEl = document.getElementById('calendar-events');
  if (!calendarEventsEl) return;

  const eventsForDay = corporateEvents.filter(e => e.day === day && e.month === month);
  const birthdaysForDay = employeeBirthdays.filter(b => b.day === day && b.month === month);

  calendarEventsEl.innerHTML = '';
  
  if (eventsForDay.length === 0 && birthdaysForDay.length === 0) {
    calendarEventsEl.innerHTML = `<p class="no-events">No events for this day.</p>`;
    return;
  }
  
  const eventsList = document.createElement('ul');
  
  eventsForDay.forEach(event => {
    const li = document.createElement('li');
    li.textContent = event.title;
    eventsList.appendChild(li);
  });
  
  birthdaysForDay.forEach(birthday => {
    const li = document.createElement('li');
    li.textContent = `🎉 ${birthday.name}'s Birthday`;
    eventsList.appendChild(li);
  });

  calendarEventsEl.appendChild(eventsList);
}

function renderCalendar() {
  const calendarTitleEl = document.getElementById('calendar-title');
  const calendarDaysEl = document.getElementById('calendar-days');

  if (!calendarTitleEl || !calendarDaysEl) return;

  const month = today.getMonth(); // 0-indexed for Date object compatibility
  const year = today.getFullYear();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  calendarTitleEl.textContent = `${monthNames[month]} ${year}`;

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarDaysEl.innerHTML = '';

  for (let i = 0; i < firstDayOfMonth; i++) {
    const emptyDiv = document.createElement('div');
    emptyDiv.classList.add('day', 'empty');
    calendarDaysEl.appendChild(emptyDiv);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayDiv = document.createElement('div');
    dayDiv.classList.add('day');
    dayDiv.textContent = i.toString();
    dayDiv.dataset.day = i.toString();

    if (i === currentDay) {
      dayDiv.classList.add('current-day');
    }

    dayDiv.addEventListener('click', () => {
      const selected = document.querySelector('.selected-day');
      if (selected) {
        selected.classList.remove('selected-day');
      }
      dayDiv.classList.add('selected-day');
      // month + 1 to convert from 0-indexed to 1-indexed for our data
      displayEventsForDay(i, month + 1, year); 
    });

    calendarDaysEl.appendChild(dayDiv);
  }

  // Display today's events and set today as selected on initial load
  const todayEl = calendarDaysEl.querySelector(`.day[data-day='${currentDay}']`);
  if (todayEl) {
    todayEl.classList.add('selected-day');
  }
  displayEventsForDay(currentDay, month + 1, year);
}

function checkBirthdays() {
  const birthdayWidgetEl = document.getElementById('birthday-widget');
  if (!birthdayWidgetEl) return;

  const todayBirthdays = employeeBirthdays.filter(b => b.month === currentMonth && b.day === currentDay);

  if (todayBirthdays.length > 0) {
    const names = todayBirthdays.map(b => b.name).join(', ');
    birthdayWidgetEl.innerHTML = `
      <h3>🎉 Happy Birthday! 🎉</h3>
      <p>Wishing a wonderful day to ${names}!</p>
    `;
  } else {
    birthdayWidgetEl.innerHTML = `
      <h3>Today's Birthdays</h3>
      <p>No birthdays today.</p>
    `;
  }
}

function renderNewsFeed() {
  const newsFeedContentEl = document.getElementById('news-feed-content');
  if (!newsFeedContentEl) return;

  const newsArticles = [
    {
      title: 'Q3 Financial Results Announced',
      excerpt: 'We have exceeded our quarterly targets, showing strong growth in all key sectors.'
    },
    {
      title: 'New Partnership with TechCorp',
      excerpt: 'A strategic alliance that will drive innovation and expand our market reach.'
    },
    {
      title: 'Annual Company Retreat Details',
      excerpt: 'Get ready for an exciting team-building event in the mountains this November!'
    }
  ];

  newsFeedContentEl.innerHTML = '';

  newsArticles.forEach(article => {
    const articleDiv = document.createElement('div');
    articleDiv.classList.add('news-item');

    const titleEl = document.createElement('h4');
    titleEl.classList.add('news-title');
    titleEl.textContent = article.title;

    const excerptEl = document.createElement('p');
    excerptEl.classList.add('news-excerpt');
    excerptEl.textContent = article.excerpt;

    articleDiv.appendChild(titleEl);
    articleDiv.appendChild(excerptEl);
    newsFeedContentEl.appendChild(articleDiv);
  });
}
