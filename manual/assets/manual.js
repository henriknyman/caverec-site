(function () {
  const modal = document.getElementById('search-modal-backdrop');
  const openBtn = document.getElementById('open-search-btn');
  const input = document.getElementById('manual-search-input');
  const resultsBox = document.getElementById('manual-search-results');
  let searchIndex = [];

  if (window.CAVEREC_SEARCH_INDEX && Array.isArray(window.CAVEREC_SEARCH_INDEX)) {
    searchIndex = window.CAVEREC_SEARCH_INDEX;
  } else {
    fetch('assets/search-index.json')
      .then((r) => r.json())
      .then((data) => { searchIndex = data; })
      .catch(() => {});
  }

  function openSearch() {
    if (!modal) return;
    modal.classList.add('open');
    if (input) {
      input.focus();
      input.select();
      renderResults(input.value);
    }
  }

  function closeSearch() {
    if (!modal) return;
    modal.classList.remove('open');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderResults(query) {
    if (!resultsBox) return;
    const q = (query || '').trim().toLowerCase();
    const terms = q.split(/\s+/).filter(Boolean);
    let matches = searchIndex;
    if (terms.length > 0) {
      matches = searchIndex
        .map((entry) => {
          const hayTitle = entry.title.toLowerCase();
          const hayBody = entry.body.toLowerCase();
          let score = 0;
          for (const t of terms) {
            if (hayTitle.includes(t)) score += 5;
            else if (hayBody.includes(t)) score += 1;
            else return null;
          }
          return { entry, score };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .map((m) => m.entry);
    }
    const top = matches.slice(0, 18);
    if (top.length === 0) {
      resultsBox.innerHTML = '<div style="padding:1rem;color:#848e9c;">No matching manual sections found.</div>';
      return;
    }
    resultsBox.innerHTML = top
      .map(
        (item) =>
          '<a class="search-result-item" href="' +
          escapeHtml(item.href) +
          '">' +
          '<div class="search-result-meta">Chapter ' +
          escapeHtml(item.chapter) +
          '</div>' +
          '<div class="search-result-title">' +
          escapeHtml(item.title) +
          '</div>' +
          '<div class="search-result-snippet">' +
          escapeHtml(item.snippet) +
          '</div>' +
          '</a>'
      )
      .join('');
  }

  if (openBtn) {
    openBtn.addEventListener('click', openSearch);
  }
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeSearch();
    });
  }
  if (input) {
    input.addEventListener('input', function () {
      renderResults(input.value);
    });
  }
  document.addEventListener('keydown', function (e) {
    if ((e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) &&
        document.activeElement !== input) {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      closeSearch();
    }
  });
})();
