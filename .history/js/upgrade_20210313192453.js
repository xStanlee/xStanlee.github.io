document.addEventListener('DOMContentLoaded', () => {
    const fileUploadBtn = document.querySelector('#avatar');
    const fileUploadBtnBig = document.querySelector('.btn');

    fileUploadBtnBig.addEventListener('click', () =>{
        fileUploadBtn.click();
    })
});