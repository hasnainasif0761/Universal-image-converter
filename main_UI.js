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


// Drop Zone Section Start
const dropZone = document.getElementById('dropZone');
const inputField = document.getElementById('inputField');
const uploadImg = document.getElementById('uploadImg');

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
    
}









