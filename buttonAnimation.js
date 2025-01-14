// Función para animar el texto del título
function splitText(textEl) {
    if(!textEl || !textEl.innerHTML) {
        return
    }

    let text = textEl.innerHTML.split('');
    textEl.innerHTML = '';
    text.forEach((letter) => {
        let span = document.createElement('span');
        span.innerHTML = letter;
        textEl.appendChild(span);
    });
}

// Animación de los botones
let btnGroup = document.querySelector('.button-layout');
let buttons = document.querySelectorAll('.button');
let title = document.querySelector('h2');

splitText(title);

gsap.to(btnGroup, {
    opacity: 1, 
    delay: .5,
    duration: .5
});

buttons.forEach((button, i) => {
    gsap.to(button, {
        x: 0, 
        opacity: 1, 
        delay: .5 + (.1 * i),
        duration: .2
    });
});

let headingLetters = title.querySelectorAll('span');
headingLetters.forEach((letter, i) => {
    gsap.to(letter, {
        opacity: 1, 
        delay: .75 + (.075 * i),
        duration: .05
    });
});
