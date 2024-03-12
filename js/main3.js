document.addEventListener('DOMContentLoaded', function () {
    loadBookmarks();
});

function addNewBookmark() {
    const bookmarkForm = document.getElementById('bookmarkForm');
    const urlInput = bookmarkForm.url;
    const nameInput = bookmarkForm.name;

    const bookmarkList = document.getElementById('bookmarkList');
    const bookmarkItem = document.createElement('li');
    bookmarkItem.innerHTML = `
        <a href="${urlInput.value}" target="_blank">${nameInput.value}</a>
        <button onclick="deleteBookmark(this)">Видалити</button>`;
    bookmarkList.appendChild(bookmarkItem);
    saveBookmarks();
    bookmarkForm.reset();
}

function deleteBookmark(button) {
    const bookmarkItem = button.parentNode;
    bookmarkItem.remove();
    saveBookmarks();
}

function saveBookmarks() {
    const bookmarkList = document.getElementById('bookmarkList');
    const bookmarks = [];

    bookmarkList.querySelectorAll('li').forEach(bookmarkItem => {
        const url = bookmarkItem.querySelector('a').getAttribute('href');
        const name = bookmarkItem.querySelector('a').innerText;
        bookmarks.push({ url, name });
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function loadBookmarks() {
    const bookmarkList = document.getElementById('bookmarkList');
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

    bookmarks.forEach(bookmark => {
        const bookmarkItem = document.createElement('li');
        bookmarkItem.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
            <button onclick="deleteBookmark(this)">Видалити</button>
        `;
        bookmarkList.appendChild(bookmarkItem);
    });
}