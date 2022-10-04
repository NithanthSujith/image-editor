const fileInput = document.querySelector('.file-input'),
chooseImg = document.querySelector('.choose-img'),
previewImg = document.querySelector('.preview-img img'),
filterOptions = document.querySelectorAll('.filter button'),
filterName = document.querySelector('.filter-info .name'),
filterSlider = document.querySelector('.slider input'),
sliderValue = document.querySelector('.filter-info .value'),
rotateOptions= document.querySelectorAll('.rotate button'),
resetFilterBtn= document.querySelector('.reset-filters'),
saveImgBtn = document.querySelector('.save-img');








// setting the default value of all filters
let brightness = 100, saturation = 100, inversion = 0, greyscale = 0;
let rotate = 0 , flipHorizontal = 1, flipVertical = 1;




//showing user the selected img and creating a function 
const loadimg = ()=>{
    let file = fileInput.files[0]// getting user selected file
    if(!file) return; // returning when user has not selected any file
    previewImg.src = URL.createObjectURL(file);// passing file url as preview img
    previewImg.addEventListener('load',()=>{
        resetFilterBtn.click();//clicking the reset button whenever the user selects a new image
        document.querySelector('.container').classList.remove('disable');
    });
}
fileInput.addEventListener('change',loadimg);




// choose img button working using click function on the file input
chooseImg.addEventListener('click',()=> fileInput.click());






// setting the filter buttons
filterOptions.forEach(option=>{
    option.addEventListener('click',()=>{
        document.querySelector('.filter .active').classList.remove('active');
        option.classList.add('active');
        filterName.innerText = option.innerText;

        if(option.id ==='brightness'){
            filterSlider.max = '200';
            filterSlider.value = brightness;
            sliderValue.innerText = `${brightness}%`
        }else if(option.id ==='saturation'){
            filterSlider.max = '200';
            filterSlider.value = saturation;
            sliderValue.innerText = `${saturation}%`
        }else if(option.id ==='inversion'){
            filterSlider.max = '100';
            filterSlider.value = inversion;
            sliderValue.innerText = `${inversion}%`
        }else{
            filterSlider.max = '100';
            filterSlider.value = greyscale;
            sliderValue.innerText = `${greyscale}%`
        }
    })
})
// creating a function that applies the filters
 const applyFilter= ()=>{
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${greyscale}%)`;
    
}






// creating a function updateSlider so as to update the slider bar
const updateSlider = ()=>{
    let sliderStatus = Math.ceil(filterSlider.value);
    sliderValue.innerText = `${sliderStatus}%`;
    const selectedFilter = document.querySelector('.filter .active');// getting the current filter
    if (selectedFilter.id ==="brightness") {
        brightness = filterSlider.value;
    }else if(selectedFilter.id ==="saturation"){
        saturation = filterSlider.value;
    }
    else if(selectedFilter.id ==="inversion"){
        inversion = filterSlider.value;
    }else{
        greyscale = filterSlider.value;
    }
    // now we call a function that would apply the filters
    applyFilter();
}
filterSlider.addEventListener('input',updateSlider)







// setting the rotate and flip options
rotateOptions.forEach(option=>{
    option.addEventListener('click',()=>{
        if (option.id === 'left') {
            rotate -= 90; 
        }else if(option.id === 'right'){
            rotate += 90;
        }else if(option.id === 'horizontal'){
           flipHorizontal = flipHorizontal=== 1? -1 :1;// if fliphorizontal is 1 then put value as -1 else put value as -1
        }else{
            flipVertical = flipVertical=== 1? -1 :1;// if flipVertical is 1 then put value as -1 else put value as -1
        }
        applyFilter();
    })

})






// setting the reset button
const resetFilter = ()=>{
    // resetting all the filters to default one 
    brightness = 100; saturation = 100; inversion = 0; greyscale = 0;
    rotate = 0 ; flipHorizontal = 1; flipVertical = 1;
    filterOptions[0].click();//clicking on brightness button so as to set it to the deafult way
    applyFilter();
}

resetFilterBtn.addEventListener('click',resetFilter);







// setting the save img button 
const saveImg = ()=>{
    console.log('hi')
    const canvas = document.createElement('canvas');// creating canvas element
    const ctx = canvas.getContext('2d');
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    // giving the filters applied to the created canvas
    ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${greyscale}%)`;
    ctx.translate(canvas.width/2, canvas.height/2)
    if(rotate !== 0){
        ctx.rotate(rotate * Math.PI / 180)
        
    }
    ctx.scale(flipHorizontal, flipVertical)
    ctx.drawImage(previewImg,-canvas.width/2, -canvas.height/2,canvas.width, canvas.height);
    


    const link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = canvas.toDataURL();
    link.click();
}


saveImgBtn.addEventListener('click',saveImg);


const bodyTag = document.querySelector('body'),
darkmodeButton = document.querySelector('.darkmode'),
container = document.querySelector('.container'),
containerHeading = document.querySelector('.container h2'),
editorPanel = document.querySelector('.editor-panel'),

modeButton = document.querySelector('.bx-moon');
// creating the dark mode
let modeStatus = 0;

darkmodeButton.addEventListener('click',function(){
    if (modeStatus ===0) {
        bodyTag.style.background = '#0d0d0d';
        bodyTag.style.setProperty('transition','background 0.5s ease-in')
        modeButton.classList.remove('bx-moon');
        modeButton.classList.add('bx-sun');
        modeButton.style.color='white';
        darkmodeButton.style.background = '#424244'
        containerHeading.style.color = 'white';
        container.style.background = '#252525';
        container.style.boxShadow = '0 0px 40px rgb(255 255 255 / 35%)';
        editorPanel.style.backgroundColor = '#3f3e3e';
        editorPanel.style.border = '1px solid #535050';
        editorPanel.style.boxShadow = '0 0 10px #ffffff54';
        editorPanel.style.color= 'white';
        filterName.style.color= 'white';
        sliderValue.style.color= 'white';
        container.style.setProperty('transition','background 0.5s ease-in')
        editorPanel.style.setProperty('transition','background 0.5s ease-in')
        modeStatus+=1;
    } else {
        bodyTag.style.background = '#d7d9ed';
        bodyTag.style.setProperty('transition','background 0.5s ease-in')
        modeButton.classList.remove('bx-sun');
        modeButton.classList.add('bx-moon');
        modeButton.style.color='black';
        darkmodeButton.style.background = '#c0c3e0'
        containerHeading.style.color = 'black';
        container.style.background = 'white';
        container.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        editorPanel.style.backgroundColor = '#f5f5f5';
        editorPanel.style.border = '1px solid #ccc';
        editorPanel.style.boxShadow = 'none';
        editorPanel.style.color= 'black';
        filterName.style.color= 'black';
        sliderValue.style.color= 'black';
        container.style.setProperty('transition','background 0.5s ease-in')
        editorPanel.style.setProperty('transition','background 0.5s ease-in')
        modeStatus-=1;
    }
})




