const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable / Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}
// Passing Joke to voiceRSS API
function tellMe(joke) {
    VoiceRSS.speech({
        key: '633fa2570cdf446eaf2e263eb0889f00',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from joke API
async function getjokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-to-Speech
        tellMe(joke);
        // Disable Button
        toggleButton();
    } catch (error) {
        console.log('whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getjokes);
audioElement.addEventListener('ended', toggleButton);