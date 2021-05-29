const ranNumbers = [];
for (let index = 0; index < 5; index++) {
  //make a random num
  ranNumbers.push(Math.floot(Math.random() * lengthOfResults));
}
console.log(ranNumbers);

fetch('/api/trailRoutes', {
  method: 'GET',
  body: JSON.stringify(ranNumbers),
  headers: { 'Content-Type': 'application/json' },
});
