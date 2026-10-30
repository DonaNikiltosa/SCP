import { loadUsers, saveUsers, saveCurrentUser, removeCurrentUser } from "./storage.js";
import { authScreen, ScpScreenPlatform } from "./screen.js";
import { initCards } from "./cards.js";

export function initAuth() {
    document.getElementById('reg-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const users = loadUsers();

        const login = document.getElementById('reg-login').value.trim();
        const pass = document.getElementById('reg-pass').value.trim();

        if(!login || !pass) {
            document.querySelector('.reg-message').textContent = 'Введите логин или пароль';
            return;
        }

        if(users.find(u => u.login === login)) {
            document.querySelector('.reg-message').textContent = 'Логин занят';
            return;
        }

        users.push({login, pass});
        saveUsers(users);
        document.querySelector('.reg-message').textContent = 'Регистрация прошла успешно!';
    });

    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const users = loadUsers();

        const login = document.getElementById('login-login').value.trim();
        const pass = document.getElementById('login-pass').value.trim();

        const user = users.find(u => u.login === login && u.pass === pass);

        if (!user) {
            document.querySelector('.login-message').textContent = 'Логин или пароль введён не верно';
            return;
        }

        saveCurrentUser(user);
        authScreen();
        initCards();
    });

    document.querySelector('.logout-btn').addEventListener('click', () => {
        removeCurrentUser();

        document.querySelector('.container-cards').innerHTML = '';

        ScpScreenPlatform();
        
        document.getElementById('reg-login').value = '';
        document.getElementById('reg-pass').value = '';
        document.getElementById('login-login').value = '';
        document.getElementById('login-pass').value = '';
        document.querySelector('.reg-message').textContent = '';
        document.querySelector('.login-message').textContent = '';
    })
}