const newTrailHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#trailName').value.trim();
  const location = document.querySelector('#location').value.trim();
  const distance = +document.querySelector('#trailLength').value.trim();
  const elevation = +document.querySelector('#elevation').value.trim();
  const difficulty = document.querySelector('#difficulty').value.trim();

  if (name && location) {
    const response = await fetch(`/api/trails`, {
      method: 'POST',
      body: JSON.stringify({ name, location, distance, elevation, difficulty }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create trail');
    }
  }
};

document
  .querySelector('.new-trail-form')
  .addEventListener('submit', newTrailHandler);
