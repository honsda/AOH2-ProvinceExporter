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
var tempfiles = [];
var mapeditorf = document.getElementById('mapeditorfile');
var zip = JSZip();

//TEMPDATA
var anum = 0;
var bnum = 0;
  
function sub(obj) {
    var file = obj.value;
    var fileName = file.split("\\");
    fname = fileName[fileName.length - 1];
}

mapeditorf.addEventListener('change',function () {
    anum=0;bnum=0;tempfiles.length=0;temp.length=0;document.getElementById('showfile').innerHTML = '';
    var fr = new FileReader();
    notifreset()
    $("#downloadzip").css({"opacity": "1"}).text("Export Provinces")
    fr.onload = function () {cont = this.result;document.getElementById('showfile').innerHTML = `<p style="font-weight:bolder;background-color:rgba(49, 49, 53, 0.5);padding:10px;">${fname}</p>${this.result};`};
    try {fr.readAsText(this.files[0]);} catch (e) {return;}
});

function getext() {
    var ext = /^.+\.([^.]+)$/.exec(fname);
    return ext == null ? "" : ext[1];
}

function isOE(n) {
    if(n%2==0) {
        return true;
    } else return false;
}

function linec(text) {
    var nLines = 0;
    for( var i = 0, n = text.length;  i < n;  ++i ) {
        if( text[i] === '\n' ) {
            ++nLines;
        }
    }
    return nLines + 1;
}

//ZIP

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
    else if(getext() != "txt") {notifwarn("Invalid file extension! please upload a '.txt' file.");}
    else if(cont) if(!cont.includes(',') || cont.includes(';')) {notifwarn("Invalid file format! please upload the correct file.")}
    else {
        $("#downloadzip").animate({opacity:'0.5'}, 2000)
        $("#downloadzip").text("Exporting in process, a ZIP file should be downloaded once it's done. Please be patient.")
        notifreset()
        fr.onload = function() {
            var lines = this.result.split('\n');
            for(var line = 0; line < lines.length; line++){
                temp.push(lines[line].replace(/(?:\r\n|\r|\n)/g, ''));
            }
        };
        setTimeout(() => {
            console.log(temp);
            if(temp.length == linec(cont)) temp.forEach((data, i) => {
                if (!isOE(i)) {console.log(`making province number ${(i+1)/2}`);console.log(anum);anum++;}
                if(i!=linec(cont)-1) {
                    if(isOE(i)) {
                        //var tempfile = new File([`${temp[bnum]};${temp[bnum+1]}`], `${anum}`, {type: "text/plain;charset=utf-8"});
                        console.log(`${temp[bnum]};${temp[bnum+1]}`);
                        zip.file(`${anum}`, `${temp[bnum]};${temp[bnum+1]}`);
                        //tempfiles.push(tempfile)
                        console.log(tempfiles);
                    }
                    bnum++;
                }
            })
            zip.generateAsync({type:"blob"})
            .then(function (blob) {
                saveAs(blob, "exportedProvinces.zip");
            });
        }, 1000);
    }
}