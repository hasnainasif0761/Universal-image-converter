document.addEventListener('DOMContentLoaded',()=>{
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
    return (bytes / Math.pow(k,i)).toFixed(2) + '' + size[i]
}

function setButtonLoading(btn, loading = true){
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


const events = ['dragenter','dragover','dragleave'];

events.forEach(eventName=>{
 imageUploadZone.addEventListener(eventName, handlePreventDefault, false);
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


imageUploadZone.addEventListener('drop',(e)=>{
    e.preventDefault();
    const file = Array.from(e.dataTransfer.files).filter(f=>f.type.startsWith('image/'));
    handleImageFiles(file);
})

imageUploadZone.addEventListener('click',()=>imageInput.click());
imageInput.addEventListener('change', (e)=>{
    const files = Array.from(e.target.files);
    handleImageFiles(files);
});

function handleImageFiles(files){
    if(files.length == 0) return;

    state.imageFiles = [...state.imageFiles,...files]
    updateImagePreview();
    imagePreview.classList.add('active');
    imageContrls.style.display = 'flex';
    showToast(`Added ${files.length} images(s)`,'success');
}

function updateImagePreview(){
    imagePreviewList.innerHTML = state.imageFiles.map((file,idx)=>`
    <div class="preview-item">
        <img src="${URL.createObjectURL(file)}" class="preview-thumb" alt="${file.name}">
        <div class="preview-info">
            <div class="preview-name">${file.name}</div>
            <div class="preview-size">${formatFileSize(file.size)}</div>
        </div>
        <button class="preview-remove" onclick="removeImage(${idx})">X</button>
    </div>
    `).join('')
}

window.removeImage = (index) =>{
    state.imageFiles.splice(index,1);
    showToast('Remove Image Successfully','error')
    updateImagePreview();
    if(state.imageFiles.length == 0){
        imagePreview.classList.remove('active');
        imageContrls.style.display = 'none';
        document.getElementById('imageResults').classList.remove('active');
    }
}

document.querySelectorAll('.image-converter .formate-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
        document.querySelectorAll('.image-converter .formate-btn').forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        state.currentImageFormate = btn.dataset.format;
    })
})

quantitySlider.addEventListener('input',e=>{
    qualityValue.textContent = e.target.value + '%';
})

convertImageBtn.addEventListener('click', async()=>{
    if(state.imageFiles.length == 0) return ;
    setButtonLoading(convertImageBtn);
    const progressContainer = document.getElementById('imageProgress');
    const progressFill = document.getElementById('imageProgressFill');
    const progressText = document.getElementById('imageProgressText');
    const resultContainer = document.getElementById('imageResults');
    const resultGrid = document.getElementById('imageResultGrid');

    progressContainer.classList.add('active');
    resultContainer.classList.remove('active');
    state.converterImage = [];

    for(let i = 0; i < state.imageFiles.length; i++){
        const file = state.imageFiles[i];
        const progress = (( 1 + i) / state.imageFiles.length) * 100;
        progressFill.style.width = progress + '%';
        progressText.textContent = `Converting...${Math.round(progress)}%`;

        try {
            const converted = await converterImage(file, state.currentImageFormate, quantitySlider.value/100);
            state.converterImage.push(converted)
        } catch (error) {
            showToast(`Failed to convert ${file.name}`, 'error')
        }

    }
    progressContainer.classList.remove('active');
    setButtonLoading(convertImageBtn,false);

    resultGrid.innerHTML = state.converterImage.map((img,index)=>`
        <div class="result-item" onclick="dowloadConverterImage(${index})">
            <img src="${img.url}" alt="Converter" >
            <div class="result-overlay">${img.name}</div>
        </div>
    `).join('');

    resultContainer.classList.add('active');
    showToast('Conversion Completed Successfully','success');
})
})

