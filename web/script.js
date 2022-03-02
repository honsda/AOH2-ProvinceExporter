document.addEventListener('click', mAutoplay);
function mAutoplay() {
    aud_play_pause();
    document.removeEventListener('click', mAutoplay);
}