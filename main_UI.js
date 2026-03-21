const state = {
    imageFiles: [],
    currentConverterType: null,
}

const converterSelector = document.querySelectorAll('.inner-card');
converterSelector.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        converterSelector.forEach((e)=>e.classList.remove('active'))
        btn.classList.add('active');
        state.currentConverterType = btn.dataset.convertertype
        checkConverterType();
    })
})

function checkConverterType () {
    if(state.currentConverterType === 'image'){
        alert('Your Converter Type is Image to Image');
    }else if(state.currentConverterType === 'pdftoimage'){
        alert('Your Converter Type is PDF to Image')
    }else if(state.currentConverterType === 'imagetopdf'){
        alert('Your Converter Type is Image to PDF')
    }else
    {
        alert('Please Try Again | Type Not Found 💥')
    }
}

// Human ReadAble Size Converter Formula 💥
function formateFileSize(bytes){
    if(bytes.length == 0) return '0 Bytes';
    const k = 1024;
    const size = ['bytes','KB','MB','GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k,i)).toFixed(2) + ' ' + size[i];
}



// Drop Zone Section Start
const dropZone = document.getElementById('dropZone');
const inputField = document.getElementById('inputField');
const uploadImg = document.getElementById('uploadImg');
const view_Conveter_Img = document.querySelector('.view_Conveter_Img');

// console.log(dropZone);

['dragover', 'dragenter', 'dragleave', 'drop'].forEach((eventName) => {
    dropZone.addEventListener(eventName, handlePreventDefault, false);
});

function handlePreventDefault(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragover', 'dragenter'].forEach((eventName) => {
    dropZone.addEventListener(eventName, () => {
        dropZone.classList.add('active');
    }, false);
});

['dragleave', 'drop'].forEach((eventName) => {
    dropZone.addEventListener(eventName, () => {
        dropZone.classList.remove('active');
    }, false);
});

uploadImg.addEventListener('click',()=>inputField.click());
inputField.addEventListener('change',(e)=>{
    const files = Array.from(e.target.files);
    handleImageFile(files);
})

dropZone.addEventListener('drop',(e)=>{
    const allFiles = Array.from(e.dataTransfer.files)
    const files = allFiles.filter((f)=>f.type.startsWith('image/'));

    if(files.length == 0){
        alert(`Please Upload Only Image File Not Allow ${allFiles[0].type} File`);
        return;
    }
    handleImageFile(files)
})

function handleImageFile(file){
    if(file.length == 0) return;

    state.imageFiles = [...state.imageFiles,...file];
    updateImagePreview();
    alert('Image Added Successfully 💥🎊');
}

function updateImagePreview(){
    view_Conveter_Img.innerHTML = state.imageFiles.map((file,idx)=>`
    <div class="w-[96%] h-auto border flex ml-2 relative px-2 py-1 rounded-[5px]">
    <img src="${URL.createObjectURL(file)}" class="block w-[40px] h-[50px] rounded-[10px]">
    
    <div class="mt-1 ml-1">
        <p class="text-[11px] font-semibold truncate max-w-[90px]">${file.name}</p>
        <p class="text-[11px] font-semibold text-gray-500/80">${formateFileSize(file.size)}</p>
    </div>
        <i class="ri-close-line text-xl absolute top-3 right-2 bg-red-300 px-1 rounded-[10px] hover:bg-red-400 cursor-pointer transition-all duration-500 hover:rotate-[90deg]" onclick="removeFileFunc(${idx})"></i>
        </div>
    `).join('');
}

function removeFileFunc(id){
    state.imageFiles.splice(id,1);
    updateImagePreview()
}








