import { loadCards, initDefaultWithId } from './storage.js';

export function initCards() {
    initDefaultWithId();
    const cards = loadCards();

    const cardScp = document.querySelector('.container-cards');
    
    cards.forEach(c => {
        const card = document.createElement('div');
        card.classList.add('card-scp');
        card.innerHTML = `
            <p>${c.scpNumber}</p>
            <p>${c.scpName}</p>
            <p class="object-class ${
                c.objectClass.includes('Безопасный') ? 'safe' : 
                c.objectClass.includes('Евклид') ? 'euclid' : 
                c.objectClass.includes('Кетер') ? 'keter' : ''
            }">
                ${c.objectClass}
            </p>
            <div class='btn'>
            <button class='edit-btn'>Редактировать</button>
            <button class='delete-btn'>Удалить</button>
            <div>
        `
        cardScp.append(card);
    });
}