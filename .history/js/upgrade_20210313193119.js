document.addEventListener('DOMContentLoaded', () => {
    const fileUploadBtn = document.querySelector('#avatar');
    const fileUploadBtnBig = document.querySelector('.btn');
    const fileUploadBtnSmall = document.querySelectorAll('.user-nav__icon-box')[1];

    fileUploadBtnBig.addEventListener('click', () => {
        fileUploadBtn.click();
    })
    fileUploadBtnSmall.addEventListener('click', () => {
        fileUploadBtn.click();
    })
});