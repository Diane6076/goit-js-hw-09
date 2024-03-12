document.addEventListener('DOMContentLoaded', function () {
    loadData();
});

function saveData() {
    const dataForm = document.getElementById('dataForm');
    const formData = new FormData(dataForm);

    const saveDataDiv = document.getElementById('saveData');
    saveDataDiv.innerHTML = '';

    formData.forEach((value, key) => {
        localStorage.setItem(key, value);
        saveDataDiv.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
    });

    dataForm.reset();
}

function loadData() {
    const saveDataDiv = document.getElementById('savedData');
    saveDataDiv.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        saveDataDiv.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
    }
}



document.addEventListener('DOMContentLoaded', function () {
    checkLoginStatus();
});

function checkCredentials() {
    const loginForm = document.getElementById('loginForm');
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    localStorage.setItem('savedUsername', 'admin');
    localStorage.setItem('savedPassword', 'password');

    if (username === localStorage.getItem('savedUsername') && password === localStorage.getItem('savedPassword')) {
        document.getElementById('loginResult').innerText = 'Успішний вхід!';
    } else {
        document.getElementById('loginResult').innerText = 'Невірний логін або пароль.';
    }

    loginForm.reset();
}

function checkLoginStatus() {
    const savedUsername = localStorage.getItem('savedUsername');
    const savedPassword = localStorage.getItem('savedPassword');
    
    if (savedUsername && savedPassword) {
        document.getElementById('loginResult').innerText = 'Ви увійшли як ' + savedUsername;
    }
}