document.addEventListener('DOMContentLoaded', () => {
    const fileUploadBtn = document.querySelector('#avatar');
    const fileUploadBtnBig = document.querySelector('.btn');
    const fileUploadBtnSmall = document.querySelectorAll('.user-nav__icon-box');

    console.log(fileUploadBtnSmall);

    fileUploadBtnBig.addEventListener('click', () => {
        fileUploadBtn.click();
    })
});