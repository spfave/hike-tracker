const newHikeHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#hikeName').value.trim();
  const hikeTime = document.querySelector('#hikeTime').value.trim();
    const description = document.querySelector('#description').value.trim();

    if (name && hikeTime && description) {
        const response = await fetch(`/api/hikes`, {
          method: 'POST',
          body: JSON.stringify({ name, hikeTime, description}),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
            document.location.replace('/homepage');
          } else {
            alert('Failed to create hike');
          }
        }
};
      
document
  .querySelector('.new-hike-form')
    .addEventListener('submit', newHikeHandler);