const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

async function loadSearchIndex() {
  const response = await fetch('assets/js/search-index.json');
  return await response.json();
}

let searchIndex = null;

searchInput.addEventListener('input', async (e) => {
  const query = e.target.value.trim();

  if (!searchIndex) {
    searchIndex = await loadSearchIndex();
  }

  if (query.length < 2) {
    searchResults.classList.remove('active');
    return;
  }

  const results = searchIndex.pages.filter(page => {
    const text = (page.title + ' ' + page.keywords + ' ' + page.summary).toLowerCase();
    return text.includes(query.toLowerCase());
  });

  displayResults(results);
});

function displayResults(results) {
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item">未找到结果</div>';
  } else {
    searchResults.innerHTML = results.map(page => `
      <div class="search-result-item">
        <a href="${page.url}">
          <strong>${page.title}</strong>
          <p style="font-size: 0.9em; color: #666;">${page.summary}</p>
        </a>
      </div>
    `).join('');
  }
  searchResults.classList.add('active');
}

document.addEventListener('click', (e) => {
  if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
    searchResults.classList.remove('active');
  }
});
