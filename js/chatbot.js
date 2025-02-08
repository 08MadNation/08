(function () {
    // Encapsulated Chatbot Code
    const chatbotScript = document.createElement('script');
    chatbotScript.type = 'text/javascript';

    chatbotScript.innerHTML = `
        (function () {
            // Private Scope: Avoids conflicts with existing website code
            const chatbotContainerId = 'ccn-chatbot-container';
            
            // Check if the chatbot container already exists
            if (document.getElementById(chatbotContainerId)) {
                console.warn('Chatbot is already initialized.');
                return;
            }

            // Inject CSS Styles Dynamically
            const chatbotStyles = \`
                /* General Styles */
               

                /* Chat Icon */
                .chat-icon {
                    width: 60px;
                    height: 60px;
                    background-color: #007bff;
                    color: white;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1000;
                    animation: pulse 1.5s infinite; /* Continuous hover effect */
                }

                /* Hover Effect Animation */
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }

                /* Chat Container */
                .chat-container {
                    width: 90%; /* Responsive width */
                    max-width: 400px; /* Maximum width for larger screens */
                    height: 80%; /* Responsive height */
                    max-height: 500px; /* Maximum height for larger screens */
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    display: none; /* Initially hidden */
                    flex-direction: column;
                    position: fixed;
                    bottom: 90px;
                    right: 20px;
                    z-index: 999;
                }

                /* Header with Logo and Title */
                .chat-header {
                    display: flex;
                    align-items: center;
                    padding: 10px;
                    background-color: #007bff;
                    color: white;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }

                .chat-header img {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 10px;
                }

                .chat-header h3 {
                    margin: 0;
                    font-size: 18px;
                }

                /* Chat Box */
                .chat-box {
                    flex: 1;
                    overflow-y: auto;
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    overflow-y: auto;
                }

                /* Watermark effect */
                .chat-box::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('img/bg-img/bg-221.jpg') repeat;
                    background-size: contain;
                    filter: blur(10px); /* Apply blur effect */
                    z-index: -1; /* Position the watermark behind the content */
                    opacity: 0.2; /* Reduce opacity to make it subtle */
                }


                /* Message Alignment */
                .user-message, .bot-message {
                    position: relative;
                    bottom: 0;
                    min-height: auto;
                    border: 0.15vw solid #777;
                    background-color: #fff;
                    border-radius: 0px 1.5vw 1.5vw 1.8vw;
                    padding: 1vw;
                    margin: 1.5vw 0;
                    overflow-wrap: break-word;
                    justify-content: center;
                    

                }
                .user-message {
                    word-wrap: break-word;
                    max-width: 90%;
                    border: 1.5px solid #000;
                    border-radius: 1.5vw 1.5vw 0vw 1.8vw;
                    background-color: #000000;
                    color: #fff;
                    float: right;
                    direction: ltr;
                    align-self: flex-end;
                    
                    
                }

                .bot-message{
                    align-self: flex-start;
                    word-wrap: break-word;
                    max-width: 90%;
                }

                /* .bot-message {
                    word-wrap: break-word;
                    max-width: 90%;
                    border: 1.5px solid #aea9a9;
                    border-radius: 1.5vw 0vw 1.5vw 1.8vw;
                    background-color: #fbfafa;
                    float: left;
                
                } */

                /* Input Box */
                .input-box {
                    display: flex;
                    padding: 10px;
                    border-top: 1px solid #ddd;
                }

                .input-box input {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    resize: none; /* Prevent resizing */
                    min-height: 40px; /* Minimum height */
                    max-height: 100px; /* Maximum height for long inputs */
                    word-wrap: break-word; /* Ensure long inputs wrap */
                }

                /* .input-box button {
                    padding: 10px 20px;
                    margin-left: 10px;
                    border: none;
                    background: #010a13;
                    color: white;
                    border-radius: 5px;
                    cursor: pointer;
                } */

                .input-box button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-left: 10px;
                    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 432 432'%3E%3Cpath fill='%23000' d='M213.5 3q88.5 0 151 62.5T427 216t-62.5 150.5t-151 62.5t-151-62.5T0 216T62.5 65.5T213.5 3m-.5 145L107 254h213z'/%3E%3C/svg%3E");
                    background-color: #007bff;
                    background: #007bff;
                    -webkit-mask-image: var(--svg);
                    mask-image: var(--svg);
                    -webkit-mask-repeat: no-repeat;
                    mask-repeat: no-repeat;
                    -webkit-mask-size: 100% 100%;
                    mask-size: 100% 100%;
                }

                .input-box button:hover {
                    transform: skewX(0);
                    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
                    background:rgb(11, 93, 134);
                }

                /* Pop-up Message */
                .popup-message {
                    position: fixed;
                    bottom: 100px;
                    right: 50px;
                    background-color: #fff;
                    color: #333;
                    padding: 15px;
                    border-radius: 1.9vw 1.8vw 0vw 1.8vw;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    z-index: 1000;
                    opacity: 0;
                    transform: translateY(50px);
                    transition: all 0.5s ease-in-out; /* Smooth pop-out effect */
                }

                .popup-message.show {
                    opacity: 1;
                    transform: translateY(0);
                }

                .popup-message span {
                    margin-right: 10px;
                }

                .popup-message button {
                    background: none;
                    border: none;
                    font-size: 16px;
                    cursor: pointer;
                }

                .popup-message button.close {
                    color: red;
                }

                .popup-message button.open {
                    color: #007bff;
                }

                /* Mobile responsiveness */
                @media (max-width: 768px) {
                    .popup-message {
                        bottom: 20px; 
                        right: 10px;  
                        padding: 10px; 
                        border-radius: 10px; 
                        width: 90%; 
                        max-width: 400px; 
                    }

                    .popup-message span {
                        font-size: 14px; 
                        margin-right: 5px; 
                    }

                    .popup-message button {
                        font-size: 14px; 
                    }
                }

                @media (max-width: 480px) {
                    .popup-message {
                        bottom: 10px; 
                        right: 5px;   
                        padding: 8px; 
                    }

                    .popup-message span {
                        font-size: 12px; 
                    }

                    .popup-message button {
                        font-size: 12px; 
                    }
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .chat-container {
                        width: 95%; 
                        bottom: 20px; 
                        right: 10px;
                    }

                    .popup-message {
                        bottom: 100px; 
                        right: 10px;
                    }
                }
            \`;

            // Create a <style> element and append the CSS
            const styleElement = document.createElement('style');
            styleElement.type = 'text/css';
            styleElement.appendChild(document.createTextNode(chatbotStyles));
            document.head.appendChild(styleElement);

            // Inject HTML Structure
            const chatbotHTML = \`
                <!-- Chat Icon -->
                <div class="chat-icon" id="chat-icon">
                    🤖 <!-- can be replaced with an SVG or image -->
                </div>

                <!-- Chat Container -->
                <div class="chat-container" id="chat-container">
                    <!-- Chat Header -->
                    <div class="chat-header">
                        <img src="img/bg-img/a1.png" alt="Bot Logo"> <!--  branded logo -->
                        <h3>08MadNation Assistant</h3>
                    </div>

                    <!-- Chat Box -->
                    <div class="chat-box" id="chat-box"></div>

                    <!-- Input Box -->
                    <div class="input-box">
                        <input type="text" id="user-input" placeholder="Enter your message...">
                        <button onclick="sendMessage()"></button>
                    </div>
                </div>

                <!-- Pop-up Message -->
                <div class="popup-message" id="popup-message">
                    <span>Hey! If you have any questions, you can chat with me.</span>
                    <div>
                        <button class="open" onclick="openChat()">Open chat</button>
                        <button class="close" onclick="closePopup()">x</button>
                    </div>
                </div>
            \`;
            document.body.insertAdjacentHTML('beforeend', chatbotHTML);

            // Elements
            // Ensure the DOM elements are correctly selected
            document.addEventListener("DOMContentLoaded", function () {
                const chatIcon = document.getElementById('chat-icon');
                const chatContainer = document.getElementById('chat-container');
                const popupMessage = document.getElementById('popup-message');
                const chatBox = document.getElementById('chat-box');
                const sendButton = document.querySelector('.input-box button');
                const userInput = document.getElementById('user-input');
                const openChatButton = document.querySelector('.popup-message .open');
                const closePopupButton = document.querySelector('.popup-message .close');

                function toggleChat() {
                    const chatContainer = document.getElementById('chat-container');
                    const chatIcon = document.getElementById('chat-icon');
                    const chatBox = document.getElementById('chat-box');

                    if (chatContainer.style.display === 'flex') {
                        chatContainer.style.display = 'none';
                        chatIcon.style.bottom = "20px"; // Reset icon position when closed
                    } else {
                        chatContainer.style.display = 'flex';

                        // Adjust chat icon position for mobile
                        if (window.innerWidth <= 768) {
                            chatIcon.style.bottom = "-10px"; // for mobile
                        } else {
                            chatIcon.style.bottom = "20px"; // Desktop spacing
                        }

                        // Show welcome message if chat box is empty
                        if (chatBox.innerHTML.trim() === "") {
                            addBotMessage("Welcome to 08MadNation! I am the label's AI assistant, how can I help you today with your questions?");
                        }
                    }
                }


                function openChat() {
                    toggleChat();
                    closePopup();
                }

                function closePopup() {
                    popupMessage.classList.remove('show');
                }
                
                // Format JSON for better readability
                function formatJSON(jsonString) {
                    try {
                        const parsedJSON = JSON.parse(jsonString);
                        return \`<pre><code>\${JSON.stringify(parsedJSON, null, 2)}</code></pre>\`;
                    } catch (e) {
                        return jsonString; // Return as-is if it's not valid JSON
                    }
                }

                // Format Markdown for better readability
                function formatMarkdown(markdownString) {
                    // Simple Markdown formatting for bold (**text**) and italic (*text*)
                    let formattedText = markdownString.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');
                    return formattedText;
                }

                // Detect and format the message based on its type
                function formatMessage(message) {
                    // Check if the message is JSON
                    if (typeof message === 'string' && (message.startsWith('{') || message.startsWith('['))) {
                        return formatJSON(message);
                    }
                    // Check if the message contains Markdown syntax
                    if (typeof message === 'string' && (message.includes('**') || message.includes('*'))) {
                        return formatMarkdown(message);
                    }
                    // Return the message as plain text if no special formatting is detected
                    return message;
                }

                async function sendMessage() {
                    const message = userInput.value.trim();
                    if (!message) return;

                    addUserMessage(message);
                    userInput.value = '';

                    try {
                        const response = await fetch("https://bt2.ndsec24.tech/chat", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                            },
                            body: JSON.stringify({ message })
                        });

                        if (!response.ok) throw new Error(\`HTTP Error: \${response.status} - \${response.statusText}\`);

                        const data = await response.json();
                        addBotMessage(data.response || "⚠️ Sorry, I didn't understand that.");
                    } catch (error) {
                        console.error("Fetch Error:", error);
                        addBotMessage("⚠️ Network error. Please try again.");
                    }
                }

                function addBotMessage(message) {
                    const messageDiv = document.createElement('div');
                    messageDiv.classList.add('bot-message');
                    messageDiv.innerHTML = \`<strong>08MadNation_Bot:</strong> \${message}\`;
                    chatBox.appendChild(messageDiv);
                    chatBox.scrollTop = chatBox.scrollHeight;
                }

                function addUserMessage(message) {
                    const messageDiv = document.createElement('div');
                    messageDiv.classList.add('user-message');
                    messageDiv.innerHTML = message;
                    chatBox.appendChild(messageDiv);
                    chatBox.scrollTop = chatBox.scrollHeight;
                }

                // Attach event listeners
                chatIcon.addEventListener('click', toggleChat);
                sendButton.addEventListener('click', sendMessage);
                userInput.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter') sendMessage();
                });
                openChatButton.addEventListener('click', openChat);
                closePopupButton.addEventListener('click', closePopup);

                // Make functions accessible globally
                window.openChat = openChat;
                window.closePopup = closePopup;
                window.sendMessage = sendMessage;
                window.toggleChat = toggleChat;
                window.addBotMessage = addBotMessage;

                // Initial Setup
                setTimeout(() => popupMessage.classList.add('show'), 1300);
                setTimeout(() => closePopup(), 30000);
            });
        })();
    `;

    // Append the script to the document
    document.head.appendChild(chatbotScript);

    // Initialize the chatbot
    window.initChatbot();
})();