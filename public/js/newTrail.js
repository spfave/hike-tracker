const newTrailHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#trailName').value.trim();
  const trailLength = document.querySelector('#trailLength').value.trim();
    const elevation = document.querySelector('#elevation').value.trim();
    const location = document.querySelector('#location').value.trim();

    if (name && trailLength && elevation && location) {
        const response = await fetch(`/api/trails`, {
          method: 'POST',
          body: JSON.stringify({ name, trailLength, elevation, location }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
            document.location.replace('/homepage');
          } else {
            alert('Failed to create trail');
          }
        }
};
      
document
  .querySelector('.new-trail-form')
    .addEventListener('submit', newTrailHandler);