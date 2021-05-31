const newHikeHandler = async (event) => {
  event.preventDefault();

  const trail_id = parseInt(document.querySelector('#trail-name').value);
  const date = new Date(document.querySelector('#date').value);
  const time = +document.querySelector('#time').value.trim();
  const description = document.querySelector('#description').value.trim();

  if (trail_id && date) {
    const response = await fetch(`/api/hikes`, {
      method: 'POST',
      body: JSON.stringify({ date, time, description, trail_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create hike');
    }
  }
};

const getDate = () => {
  const datePad = (dateItem) => (dateItem < 10 ? `0${dateItem}` : dateItem);

  const date = new Date();
  const year = date.getFullYear();
  const month = datePad(date.getMonth() + 1);
  const day = datePad(date.getDate());

  document.querySelector('#date').value = `${year}-${month}-${day}`;
};

getDate();

document
  .querySelector('.new-hike-form')
  .addEventListener('submit', newHikeHandler);
