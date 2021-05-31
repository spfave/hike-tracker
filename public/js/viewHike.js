const getHikeID = () => document.location.toString().split('/').pop();

const deleteHikeHandler = async (event) => {
  const response = await fetch(`/api/hikes/${getHikeID()}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete hike');
  }
};

document.querySelector('#trash').addEventListener('submit', deleteHikeHandler);
