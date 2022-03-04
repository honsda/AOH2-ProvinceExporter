document.addEventListener('click', mAutoplay);
function mAutoplay() {
    aud_play_pause();
    document.removeEventListener('click', mAutoplay);
}

//File upload/submission
function getFile() {
    document.getElementById("mapeditorfile").click();
}

let fname;
  
function sub(obj) {
    var file = obj.value;
    var fileName = file.split("\\");
    fname = fileName[fileName.length - 1];
    document.myForm.submit();
    event.preventDefault();
}

document.getElementById('mapeditorfile').addEventListener('change',function () {
            var fr = new FileReader();
            fr.onload = function () {document.getElementById('showfile').innerHTML = `<p style="background-color:rgba(49, 49, 53, 0.5);padding:10px;">${fname}</p>${this.result};`};
            fr.readAsText(this.files[0]);
        }
    );