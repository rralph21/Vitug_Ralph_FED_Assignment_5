let commonName = 'Ash'; // This would be coming from the form input.
const apiUrl = 'https://data.winnipeg.ca/resource/d3jk-hb6j.json?' +
                `$where=common_name LIKE '%${commonName}%'` +
                '&$order=diameter_at_breast_height DESC' +
                '&$limit=100';
const encodedURL = encodeURI(apiUrl);