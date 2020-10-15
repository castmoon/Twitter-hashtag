const front = document.getElementById('formFront');


front.addEventListener('submit', event => {
    event.preventDefault();
    const hashtag = document.getElementById('campo').value;
    sessionStorage.setItem('hashtag', hashtag);
    window.location = 'search.html'
});