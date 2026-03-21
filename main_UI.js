const state = [
    
]

const converterSelector = document.querySelectorAll('.inner-card');
converterSelector.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        converterSelector.forEach((e)=>e.classList.remove('active'))
        btn.classList.add('active');
    })
})