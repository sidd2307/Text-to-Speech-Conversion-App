// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input')
const rateValue = document.querySelector('#rate-value')
const rate = document.querySelector('#rate')
const pitchValue = document.querySelector('#pitch-value')
const pitch = document.querySelector('#pitch')
const voiceSelect = document.querySelector('#voice-select')
const body = document.querySelector('body')

// Init voicec array
let voices = [];

// Function to get voices
const getVoices = () => {
    voices = synth.getVoices();

    voices.forEach(voice => {
        // DOM Manipulation
        // Create option element
        const option = document.createElement('option');
        // Fill option with voice and language
        option.textContent = voice.name + '(' + voice.lang + ')';

        // Set needed option attributes
        option.setAttribute('data-name', voice.name);
        option.setAttribute('data-lang', voice.lang);
        voiceSelect.appendChild(option);
    });
};

getVoices();
if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Work on actual speaking part
const speak = () => {
    // Should run as soon as a press speak it or choose ny language
    // Check if speaking...already speaking
    if(synth.speaking) {
        console.error('Already speaking...');
        return;
    }
    if(textInput.value !== ''){
        // Add background animation
        
        body.style.background = '#141414 url(img/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        // Get speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        // Speak End
        speakText.onend = e => {
            console.log('Done seaking...');
            body.style.background = '#141414'
        }
        // Speak Error
        speakText.onerror = e => {
            console.error('Something went wrong...');
        }
        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through voices
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });
        // Set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        // Speak
        synth.speak(speakText);
    }
}

// EVENT LISTENERS
// Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

// Rate Value Change
rate.addEventListener('change',e => rateValue.textContent = rate.value)

// Pitch Value Change
pitch.addEventListener('change',e => pitchValue.textContent = pitch.value)

// Voice Select
voiceSelect.addEventListener('change', e => speak());

