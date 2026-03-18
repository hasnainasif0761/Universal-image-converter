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

function showToast(message, type='info'){
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    }

    toast.innerHTML = 
    `<span>${icons[type]}</span> <span>${message}</span>`
    container.appendChild(toast);

    setTimeout(()=>{
     toast.style.opacity = '0';
     toast.style.transform = 'translateX(100%)'
     setTimeout(()=>{
        toast.remove()
     },300)   
    },3000)
}


function formatFileSize(bytes){
    if(bytes === 0) return '0 Bytes';
    const k = 1024;
    const size = ['bytes','KB','MB','GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k,i)).toFixed(2) + '' + size[i])
}

function setButtonLoading(btn, loading = 'true'){
    if(loading){
        btn.disabled = true;
        btn.classList.add('processing');
        btn.dataset.originalText = btn.innerHTML;
        btn.innerHTML = '<div class="spinner"></div> Processing...'
    }else
    {
        btn.disabled = false;
        btn.classList.remove('processing');
        btn.innerHTML = btn.dataset.originalText
    }
}


const imageUploadZone = document.getElementById('imageUploadZone');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewList = document.getElementById('imagePreviewList');
const imageContrls = document.getElementById('imageControls');
const convertImageBtn = document.getElementById('convertImageBtn');
const quantitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');


const events = ['dragenter','dragover','dragleave','drop'];

events.forEach(eventName=>{
 imageUploadZone.addEventListener(eventName, preventDefault, false);
})


function handlePreventDefault(e){
    e.preventDefault();
    e.stopPropagation();
}

['dragenter','dragover'].forEach(eventName=>{
    imageUploadZone.addEventListener(eventName,()=>{
        imageUploadZone.classList.add('dragover');
    },false)
})


['dragleave','drop'].forEach(eventName=>{
    imageUploadZone.addEventListener(eventName,()=>{
        imageUploadZone.classList.remove('dragover');
    },false)
})











