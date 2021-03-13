document.addEventListener('DOMContentLoaded', () => {
    const fileUpload = document.querySelector('#avatar');
    const fileUploadBtnBig = document.querySelector('.btn');
    const fileUploadBtnSmall = document.querySelectorAll('.user-nav__icon-box')[1];

    fileUploadBtnBig.addEventListener('click', () => {
        fileUpload.click();
        fileUpload.files;
    })
    fileUploadBtnSmall.addEventListener('click', () => {
        fileUpload.click();
        fileUpload.files;
    })

    fileUpload.addEventListener('change', handleFile, true);
    function handleFile() {
        const file = this.files[0];
        console.log(file.type);
    }
});