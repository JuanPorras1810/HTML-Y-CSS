/**
 * Umbral para decidir si una carta debe ser desplazada (match/no match)
 * @const DECISION_THRESHOLD {number}
 */
const DECISION_THRESHOLD = 75

// Bandera para evitar múltiples animaciones simultáneas
let isAnimating = false

// Distancia movida en el eje X al arrastrar una carta
let pullDeltaX = 0

// Lista para guardar las cartas eliminadas
let historialCartas = []

/**
 * Obtiene la carta superior visible
 * @returns {HTMLElement|null}
 */
function getTopCard() {
    const cards = document.querySelectorAll('.cards article')
    return cards.length > 0 ? cards[cards.length - 1] : null
}

/**
 * Desliza la carta hacia la izquierda (rechazar)
 */
function swipeLeft() {
    const card = getTopCard()
    if (!card || isAnimating) return

    isAnimating = true
    guardarCarta(card)

    const nopeEl = document.getElementById('feedback-nope')
    iconCards('nope')
    nopeEl.addEventListener('animationend', () => {

        card.classList.add('go-left')
        card.addEventListener('transitionend', () => {
            card.remove()
            isAnimating = false
        }, { once: true })
    }, { once: true })
}

/**
 * Desliza la carta hacia la derecha (like)
 */
function swipeRight() {
    const card = getTopCard()
    if (!card || isAnimating) return

    isAnimating = true
    guardarCarta(card)

    const likeEl = document.getElementById('feedback-like')
    iconCards('like')
    likeEl.addEventListener('animationend', () => {
        card.classList.add('go-right')
        card.addEventListener('transitionend', () => {
            card.remove()
            isAnimating = false
        }, { once: true })
    }, { once: true })
}

/**
 * Inicia la funcionalidad de arrastre de la carta
 * @param {Event} event - Evento del mouse o touch
 */
function startDrag(event) {
    if (isAnimating) return

    const actualCard = event.target.closest('article')
    if (!actualCard) return

    const startX = event.pageX ?? event.touches[0].pageX

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onEnd)
    document.addEventListener('touchmove', onMove, { passive: true })
    document.addEventListener('touchend', onEnd, { passive: true })

    function onMove(event) {
        const currentX = event.pageX ?? event.touches[0].pageX
        pullDeltaX = currentX - startX

        if (pullDeltaX === 0) return

        isAnimating = true

        const deg = pullDeltaX / 14
        actualCard.style.transform = `translateX(${pullDeltaX}px) rotate(${deg}deg)`
        actualCard.style.cursor = 'grabbing'

        const opacity = Math.abs(pullDeltaX) / 100
        const isRight = pullDeltaX > 0
        const choiceEl = isRight
            ? actualCard.querySelector('.choice.like')
            : actualCard.querySelector('.choice.nope')

        if (choiceEl) choiceEl.style.opacity = opacity
    }

    function onEnd() {
        document.removeEventListener('mousemove', onMove)
        document.removeEventListener('mouseup', onEnd)
        document.removeEventListener('touchmove', onMove)
        document.removeEventListener('touchend', onEnd)

        const decisionMade = Math.abs(pullDeltaX) >= DECISION_THRESHOLD

        if (decisionMade) {
            const goRight = pullDeltaX >= 0
            iconCards(goRight ? 'like' : 'nope')
            guardarCarta(actualCard)
            actualCard.classList.add(goRight ? 'go-right' : 'go-left')
            actualCard.addEventListener('transitionend', () => {
                actualCard.remove()
            }, { once: true })
        } else {
            actualCard.classList.add('reset')
            actualCard.classList.remove('go-right', 'go-left')
            actualCard.querySelectorAll('.choice').forEach(choice => {
                choice.style.opacity = 0
            })
        }

        actualCard.addEventListener('transitionend', () => {
            actualCard.removeAttribute('style')
            actualCard.classList.remove('reset')
            pullDeltaX = 0
            isAnimating = false
        }, { once: true })

        actualCard.querySelectorAll('.choice').forEach(el => {
            el.style.opacity = 0
        })
    }
}

document.addEventListener('mousedown', startDrag)
document.addEventListener('touchstart', startDrag, { passive: true })

document.addEventListener('DOMContentLoaded', function () {
    const btnUndo = document.querySelector('button.is-undo')
    if (btnUndo) {
        btnUndo.addEventListener('click', function () {
            regresarCarta()
            console.log('volver')
        })
    }

    const btnRemove = document.querySelector('button.is-remove')
    if (btnRemove) {
        btnRemove.addEventListener('click', function () {
            swipeLeft()
            console.log('cerrar')
        })
    }

    const btnFav = document.querySelector('button.is-fav')
    if (btnFav) {
        btnFav.addEventListener('click', function () {
            swipeRight()
            console.log('match')
        })
    }
})











// Juan Porras


// like y no le gusta
function iconCards(type) {
    const hayCartas = document.querySelector('.cards article')
    if (!hayCartas) return 

    const nopeEl = document.getElementById('feedback-nope')
    const likeEl = document.getElementById('feedback-like')

    if (!nopeEl || !likeEl) return

    if (type === 'nope') {
        nopeEl.classList.remove('show-nope')
        void nopeEl.offsetWidth
        nopeEl.classList.add('show-nope')
    } else if (type === 'like') {
        likeEl.classList.remove('show-like')
        void likeEl.offsetWidth
        likeEl.classList.add('show-like')
    }
}



//copia de seguridad carta
function guardarCarta(card) {
    const copiaLimpia = card.cloneNode(true)
    copiaLimpia.classList.remove('go-left', 'go-right', 'reset')
    copiaLimpia.removeAttribute('style')
    copiaLimpia.querySelectorAll('.choice').forEach(choice => {
        choice.style.opacity = 0
    })

    historialCartas.push(copiaLimpia)
}



// Regresar
function regresarCarta() {
    if (historialCartas.length === 0 || isAnimating) return

    const contenedor = document.querySelector('.cards')
    const cartaARegresar = historialCartas.pop()

    if (contenedor && cartaARegresar) {
        const mensajeFinal = contenedor.querySelector(':scope > span')
        if (mensajeFinal) {
            contenedor.insertBefore(cartaARegresar, mensajeFinal)
        } else {
            contenedor.appendChild(cartaARegresar)
        }
    }
}



// Super like
function iconSuperLike() {
    const superEl = document.getElementById('feedback-super')
    if (!superEl) return

    superEl.classList.remove('show-super')
    void superEl.offsetWidth
    superEl.classList.add('show-super')
}

function superLike() {
    const card = getTopCard()
    if (!card || isAnimating) return

    isAnimating = true
    guardarCarta(card)

    const superEl = document.getElementById('feedback-super')
    iconSuperLike() 

    superEl.addEventListener('animationend', () => {
        card.style.transform = 'translateY(-150%) rotate(0deg)'
        card.style.transition = 'transform .3s ease'
        card.addEventListener('transitionend', () => {
            card.remove()
            isAnimating = false
        }, { once: true })
    }, { once: true })
}



// Super boost
function superBoost() {
    const card = getTopCard()
    if (!card || isAnimating) return

    isAnimating = true
    guardarCarta(card)

    card.style.transform = 'translateY(150%) scale(0.85) rotate(-12deg)'
    card.style.transition = 'transform .2s ease'
    card.addEventListener('transitionend', () => {
        card.remove()
        isAnimating = false
    }, { once: true })
}

document.addEventListener('DOMContentLoaded', function () {
    const btnStar = document.querySelector('button.is-star')
    if (btnStar) {
        btnStar.addEventListener('click', function () {
            superLike()
            console.log('super match')
        })
    }

    const btnZap = document.querySelector('button.is-zap')
    if (btnZap) {
        btnZap.addEventListener('click', function () {
            superBoost()
            console.log('super boot')
        })
    }
})