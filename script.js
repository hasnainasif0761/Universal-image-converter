const state = {
    imageFiles: [],
    pdfToImageFile: null,
    imageToPdf: [],
    converterImage: [],
    extractImage: [],
    currentImageFormate: 'png',
    currentPdfImageFormate: 'png',
    pdfPageSize: 'a4' 
}

function showToast(message, type = 'info'){
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast${type}`;

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    }

    toast.innerHTML = 
    `<span>${icons['type']}</span>`
    `<span>${message}</span>`
    container.appendChild(toast);

    setTimeout(()=>{
     toast.style.opacity = '0';
     toast.style.transform = 'translateX(100%)'
     setTimeout(()=>{
        toast.remove()
     },300)   
    },3000)
}
showToast('Hi','info')


