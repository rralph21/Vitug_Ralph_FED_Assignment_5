let commonName = 'Ash'; // This would be coming from the form input.
const apiUrl = 'https://data.winnipeg.ca/resource/d3jk-hb6j.json?' +
                `$where=common_name LIKE '%${commonName}%'` +
                '&$order=diameter_at_breast_height DESC' +
                '&$limit=100';
const encodedURL = encodeURI(apiUrl);

function setStatus(msg, isError = false) {
  const el = document.getElementById("status");
  if (!el) return;
  el.textContent = msg;
  el.classList.toggle("error", isError);
}

function renderTable(rows) {
  const table = document.getElementById("results");
  const tbody = table && table.querySelector("tbody");
  if (!table || !tbody) {
    console.warn("Need a table#results with a <tbody> to render.");
    return;
  }

  if (!rows || rows.length === 0) {
    tbody.innerHTML = "";
    table.classList.add("visually-hidden");
    return;
  }

  const frag = document.createDocumentFragment();

}