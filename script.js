document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  commonName = document.getElementById("commonName").value;
  const apiUrl =    
    // This would be coming from the form input.
    'https://data.winnipeg.ca/resource/d3jk-hb6j.json?' +
    `$where=lower(common_name) LIKE lower('%${commonName}%')` +
    '&$order=diameter_at_breast_height DESC' +
    '&$limit=100';
  encodedURL = encodeURI(apiUrl);  
  fetchTrees();                                 
});

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
        
        return;
    }

    if (!rows || rows.length === 0) {
        tbody.innerHTML = "";
        table.classList.add("visually-hidden");
        return;
    }

  const frag = document.createDocumentFragment();
  rows.forEach((row, idx) => {
   
    const { common_name, diameter_at_breast_height: dbhRaw } = row;

    const tr   = document.createElement("tr");
    const tdNo = document.createElement("td");
    const tdNm = document.createElement("td");
    const tdDb = document.createElement("td");

    tdNo.textContent = String(idx + 1);
    tdNm.textContent = common_name ?? "—";
    tdDb.textContent = dbhRaw != null ? Number(dbhRaw).toFixed(1) : "—";

    tdNo.setAttribute("aria-label", `Rank ${idx + 1}`);
    tr.append(tdNo, tdNm, tdDb);
    frag.appendChild(tr);
  });
  
  tbody.innerHTML = "";
  tbody.appendChild(frag);
  table.classList.remove("visually-hidden");
}

async function fetchTrees() {
  setStatus("Loading…");
  try {
    const res = await fetch(encodedURL);
    if (!res.ok) {
      let details = "";
      try { details = await res.text(); } catch {}
      throw new Error(`HTTP ${res.status} ${res.statusText}. ${details}`.trim());
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error("Unexpected API response (expected an array).");
    }

    renderTable(data);
    setStatus(`${data.length} result${data.length === 1 ? "" : "s"} loaded.`);
  } catch (err) {
    console.error(err);
    renderTable([]);
    setStatus("Sorry, we couldn’t load data. Please try again later.", true);
  }
}

fetchTrees(commonName);