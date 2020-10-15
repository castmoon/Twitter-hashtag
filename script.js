const divTweets = document.getElementById('divTweets');
const form = document.getElementById('formulario');


form.addEventListener('submit', event => {
    event.preventDefault();
    const hashtag = document.getElementById('campo').value;
    sessionStorage.setItem('hashtag', hashtag);

    getTweets(hashtag);
})
window.addEventListener('load', event => {
    const valor = sessionStorage.getItem('hashtag');
    if (valor.length <= 0) {
        return;
    }
    getTweets(valor);
})

        async function getTweets(hashtag){
            divTweets.innerHTML = '';
            
            const fullUrl = `http://localhost:3000/?q=${hashtag}`;
            const url = encodeURI(fullUrl);
            const request = new Request(url, {
                method: 'GET',
                //mode: 'no-cors',
                // headers: new Headers({
                //         "Authorization": 'Bearer AAAAAAAAAAAAAAAAAAAAACQXIAEAAAAASUciphepRDvWmLKAxNU%2BDLy6%2B%2BA%3DYf76D1wv4z4rZpueDBFpt8zkO9TMiYWv48zpLokclDQz4KjjiK'
               // })
            });

            const response = await fetch(request);
            const result = await response.json();
            const {data} = result;
            const tweets = data.statuses;
            //console.log(result);
            

             tweets.forEach((element, key) => {
                 if (element.extended_entities === undefined) {
                     return;
                 }
                    const midia = element.extended_entities.media;
                    midia.forEach(tweet => {
                        const mediaUrl = tweet.media_url_https;
                        const tweetUrl = tweet.expanded_url;
                        divTweets.insertAdjacentHTML("beforeend",
                        `
                        <a href='${tweetUrl}' target="_blank" rel="noreferrer noopener">
                        <img class="tweet-img" src='${mediaUrl}'>
                        </a>
                        `
                        )
                        
                    })
                 });

                // var imagemTweet = document.createElement("img");
                  //  var mediaUrl = `${element.media_url_https}`;
                  //  document.getElementById("divTweets").appendChild(imagemTweet);  
                  //  imagemTweet.src = mediaUrl
                    

                    //teste com imagem: "https://pbs.twimg.com/media/Ejllo77WkAQpDCj.jpg"
                    //teste com imagem: "https://pbs.twimg.com/media/Ejllo77WkAQpDCj.jpg"
        }