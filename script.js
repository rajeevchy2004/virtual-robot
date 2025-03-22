const voiceButton = document.getElementById('voiceButton');
const responseDiv = document.getElementById('response');

if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        responseDiv.textContent = "Listening...";
        speak("Listening...");
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript.toLowerCase();
        responseDiv.textContent = `You said: ${transcript}`;
        handleCommand(transcript);
    };

    recognition.onerror = function(event) {
        responseDiv.textContent = "Error occurred in recognition: " + event.error;
        speak("Error occurred in recognition.");
    };

    recognition.onend = function() {
        voiceButton.innerHTML = "Start Listening";
        voiceButton.classList.remove("listening");
    };

    voiceButton.addEventListener('click', function() {
        voiceButton.innerHTML = "Listening...👂";
        voiceButton.classList.add("listening");
        recognition.start();
    });

    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1.5; // Increase pitch for a robotic voice
        utterance.rate = 0.9; // Adjust the speed of speech
        window.speechSynthesis.speak(utterance);
    }

    function handleCommand(command) {
        if (command.includes('open')) {
            const app = command.split('open ')[1];
            switch(app) {
                case 'instagram':
                    speak("Opening Instagram...");
                    window.open('https://instagram.com', '_blank');
                    break;
                case 'facebook':
                    speak("Opening Facebook...");
                    window.open('https://facebook.com', '_blank');
                    break;
                case 'github':
                    speak("Opening GitHub...");
                    window.open('https://github.com', '_blank');
                    break;
                case 'linkedin':
                    speak("Opening LinkedIn...");
                    window.open('https://linkedin.com', '_blank');
                    break;
                case 'google':
                    speak("Opening Google...");
                    window.open('https://google.com', '_blank');
                    break;
                case 'youtube':
                    speak("Opening YouTube...");
                    window.open('https://youtube.com', '_blank');
                    break;
                case 'calculator':
                    speak("Opening Calculator...");
                    window.open('calculator.html', '_blank');
                    break;
                case 'notepad':
                    speak("Opening Notepad...");
                    window.open('notepad.html', '_blank');
                    break;
                case 'chrome':
                    speak("Cannot open Chrome from the browser.");
                    break;
                case 'whatsapp':
                    speak("Opening WhatsApp...");
                    window.open('https://web.whatsapp.com', '_blank');
                    break;
                case 'chatgpt':
                    speak("Opening ChatGPT...");
                    window.open('https://chat.openai.com', '_blank');
                    break;
                case 'deepseek':
                    speak("Opening Deepseek...");
                    window.open('https://deepseek.com', '_blank');
                    break;
                default:
                    speak(`Sorry, I can't open ${app}.`);
                    responseDiv.textContent = `Sorry, I can't open ${app}.`;
            }
        } else if (command.includes('who are you')) {
            const msg = "Hello! I am Sophia, your virtual robot assistant. I am created by Rajeev Kumar Choudhary. How can I help you today?";
            speak(msg);
            responseDiv.textContent = msg;
        } else {
            // Perform a Google search if command not recognized
            speak("Searching Google for " + command);
            window.open(
                `https://www.google.com/search?q=${encodeURIComponent(command)}`,
                '_blank'
            );
        }
    }
} else {
    responseDiv.textContent = "Speech recognition not supported in this browser.";
    speak("Speech recognition not supported in this browser.");
}