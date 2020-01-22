const canvas1 = document.getElementById("canvas1");
const canvas1Context = canvas1.getContext("2d");
const canvas2 = document.getElementById("canvas2");
const canvas2Context = canvas2.getContext("2d");
const slider = document.getElementById("slider");
const label = document.getElementById("label");
const anchor = document.getElementById("anchor");
const fileInput = document.getElementById("fileInput");


window.onload = function() {
    slider.value = 1
    let scale = parseInt(slider.value, 10)
    fileInput.addEventListener('change', handleImage)

    function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var img = new Image();
            img.onload = function() {
                canvas1.width = img.width;
                canvas1.height = img.height;
                canvas1Context.drawImage(img, 0, 0);
                renderNewScaledImage(scale)
                label.innerHTML = ` ${Math.pow(scale+1,3)} Colors`
                slider.addEventListener('change', () => {
                    scale = parseInt(slider.value, 10)
                    renderNewScaledImage(scale)
                    label.innerHTML = `${Math.pow(scale+1,3)} Colors`
                })
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }



    function renderNewScaledImage(scale) {
        let width = canvas1.width
        let height = canvas1.height
        imageData = canvas1Context.getImageData(0, 0, width, height);
        const newData = new ImageData(width, height)
        var scale = slider.value
        for (let startPixel = 0; startPixel < 4 * width * height; startPixel += 4) {
            newData.data[0 + startPixel] = Math.round(scale * imageData.data[0 + startPixel] / 255) * (255 / scale)
            newData.data[1 + startPixel] = Math.round(scale * imageData.data[1 + startPixel] / 255) * (255 / scale)
            newData.data[2 + startPixel] = Math.round(scale * imageData.data[2 + startPixel] / 255) * (255 / scale)
            newData.data[3 + startPixel] = 255
        }
        canvas2.width = width
        canvas2.height = height
        canvas2Context.putImageData(newData, 0, 0);
        anchor.href = canvas2.toDataURL('image/png')
    }
}