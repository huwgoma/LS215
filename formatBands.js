// Given the following array of band objects:

// let bands = [
//   { name: 'sunset rubdown', country: 'UK', active: false },
//   { name: 'women', country: 'Germany', active: false },
//   { name: 'a silver mt. zion', country: 'Spain', active: true },
// ];

// Format the data according to the following requirements: 
// - All bands should have 'Canada' as the country.
// - All words in the band name should be capitalized
// - All dots (.) should be removed from the band name
// Do not mutate the given data.

let bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];

function processBands(data) {
  return data.map(band => {
    let fixedName = processName(band.name);
    let fixedCountry = 'Canada';

    return { name: fixedName, country: fixedCountry, active: band.active };
  })
}

function processName(name) {
  return capitalizeWords(removePeriods(name));
}

function removePeriods(string) {
  return string.replaceAll(/\./g, '');
}

function capitalizeWords(string) {
  let words = string.split(' ');
  return words.map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

bands = processBands(bands);
console.log(bands);

// should return:
// [
//   { name: 'Sunset Rubdown', country: 'Canada', active: false },
//   { name: 'Women', country: 'Canada', active: false },
//   { name: 'A Silver Mt Zion', country: 'Canada', active: true },
// ]