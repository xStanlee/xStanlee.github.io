export default function chooseContent(elements) {
    let canvas;
    elements.forEach(el => el.addEventListener('click', () => {
        const src = el.getAttribute('strStorage');
        var myImage = new Image();
        myImage.src = src;
        myImage.height = '64px';
        myImage.width = '32px';
        setTimeout(function () {
            canvas = document.querySelector('.js-canvas').children[0] || 'wtf?';
            const ctx = canvas.getContext('2d');
            ctx.drawImage(myImage, 0, 0);
        }, 1000);
    }));
}