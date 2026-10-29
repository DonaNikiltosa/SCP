export const USERS = 'users';
export const CURRENT_USER = 'current-user';
export const CARD_SCP = 'card-scp';

export const DEFAULT_SCP = [
    {scpNumber: 'SCP-173', scpName: 'Скульптура', ObjectClass: 'Класс объекта: Евклид'},
    {scpNumber: 'SCP-049', scpName: 'Чумной доктор', ObjectClass: 'Класс объекта: Евклид'},
    {scpNumber: 'SCP-106', scpName: 'Старик', ObjectClass: 'Класс объекта: Кетер'},
    {scpNumber: 'SCP-426', scpName: 'Я тостер', ObjectClass: 'Класс объекта: Евклид'},
    {scpNumber: 'SCP-239', scpName: 'Дитя-ведьма', ObjectClass: 'Класс объекта: Кетер'},
];

export function loadUsers() {
    try {
        const saved = localStorage.getItem(USERS);
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
}

export function saveUsers(users) {
    localStorage.setItem(USERS, JSON.stringify(users));
}

export function loadCurrentUser() {
    try {
        const saved = localStorage.getItem(CURRENT_USER);
        return saved ? JSON.parse(saved) : null; 
    } catch {
        return null;
    }
}

export function saveCurrentUser(user) {
    localStorage.setItem(CURRENT_USER, JSON.stringify(user));
}

export function removeCurrentUser() {
    localStorage.removeItem(CURRENT_USER);
}

function cardKey() {
    const user = loadCurrentUser();
    return user && user.login ? `${CARD_SCP}:${user.login}` : CARD_SCP;
}

function initFlag() {
    const user = loadCurrentUser();
    return user && user.login ? `${CARD_SCP}:${user.login}:initialized` : `${CARD_SCP}:initialized`;
}

export function loadCards() {
    try {
        const saved = localStorage.getItem(cardKey());
        return saved ? JSON.parse(saved) : []; 
    } catch {
        return [];
    }
}

export function saveCards(cards) {
    localStorage.setItem(cardKey(), JSON.stringify(cards));
}

export function initDefaultWithId() {
    const flag = initFlag();
    const reading = localStorage.getItem(flag);
    if (reading) return;

    const card = loadCards();
    if(card.length === 0) {
        const copyDefault = DEFAULT_SCP.map(card => ({
        ...card,
        id: crypto.randomUUID(),
    }));
    saveCards(copyDefault);
    }
    localStorage.setItem(flag, 'true');
}

export function update(id, newData) {

    const update = users.map(card => {
        if(card.id !== id) {
            return {...id, ...newData}
        }
            return card;
    });
    saveCards(update);
}