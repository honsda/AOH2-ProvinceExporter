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
var cont;
var temp = [];
var tempblob = [];
var mapeditorf = document.getElementById('mapeditorfile');

//TEMPDATA
var anum = 0;
var bnum = 0;
  
function sub(obj) {
    var file = obj.value;
    var fileName = file.split("\\");
    fname = fileName[fileName.length - 1];
}

mapeditorf.addEventListener('change',function () {
        var fr = new FileReader();
        notifreset()
        $("#downloadzip").css({"opacity": "1"}).text("Export Provinces")
        fr.onload = function () {cont = this.result;document.getElementById('showfile').innerHTML = `<p style="font-weight:bolder;background-color:rgba(49, 49, 53, 0.5);padding:10px;">${fname}</p>${this.result};`};
        fr.readAsText(this.files[0]);
    }
);

function getext() {
    var ext = /^.+\.([^.]+)$/.exec(fname);
    return ext == null ? "" : ext[1];
}

function isOdd(n) {
    return Math.abs(n % 2) == 1;
}

function notifwarn(text) {
    $("#warnmsg").text(text);
    $("#notif").css({"opacity": "0", "width": "50%"});
    $("#notif").animate({opacity:'1',width: '58%'});
}
function notifreset() {
    $("#warnmsg").text('');
    $("#notif").animate({opacity:'0',width: '50%'});
}
//EXPORT PROVINCE SYS
function exportp() {
    var fr = new FileReader();
    if(mapeditorf.files[0])fr.readAsText(mapeditorf.files[0])

    if (!mapeditorf.files[0]) {notifwarn("No file is uploaded, please upload it.");}
    else if(getext() != "txt") {notifwarn("Invalid file extension! please upload a '.txt' file."); console.log(getext());}
    else if(cont) if(!cont.includes(',') || cont.includes(';')) {notifwarn("Invalid file format! please upload the correct file.")}
    else {
        $("#downloadzip").animate({opacity:'0.5'}, 2000)
        $("#downloadzip").text("Exporting in process, a ZIP file should be downloaded once it's done. Please be patient.")
        notifreset()
        fr.onload = function() {
            var lines = this.result.split('\n');
            for(var line = 0; line < lines.length; line++){
                temp.push(lines[line]);
            }
        };
    }
}