import { loadCurrentUser } from "./storage.js";

export function authScreen() {
    const user = loadCurrentUser();
    if (user) {
        document.querySelector('.auth-panel').style.display = 'none';
        document.querySelector('.scp-platform').style.display = 'block';
        document.getElementById('current-user').textContent = user.login;
    }
}

export function ScpScreenPlatform() {
    const user = loadCurrentUser();
    if (!user) {
        document.querySelector('.auth-panel').style.display = 'flex';
        document.querySelector('.scp-platform').style.display = 'none';
    }
}

export function initScreen() {
    if(loadCurrentUser()) {
        return authScreen();
    } else {
        return ScpScreenPlatform();
    }
}