window.onload = () => {
  const johnSelectorBtn = document.querySelector("#johnSelector");
  const janeSelectorBtn = document.querySelector("#janeSelector");
  const chatHeader = document.querySelector(".chat-header-title");
  const chatMessages = document.querySelector(".chat-messages");
  const chatInputForm = document.querySelector(".chat-input-form");
  const chatInput = document.querySelector(".chat-input");
  const clearChatBtn = document.querySelector(".clear-chat-button");

  const messages = JSON.parse(localStorage.getItem("messages")) || [];

  let messageSender = "John";
  const updateMessageSender = (name) => {
    messageSender = name;
    chatHeader.innerText = `${messageSender} está digitando...`;

    if (name === "John") {
      johnSelectorBtn.classList.add("active-person");
      johnSelectorBtn.disabled = true;
      janeSelectorBtn.disabled = false;
      janeSelectorBtn.classList.remove("active-person");
    } else if (name === "Jane") {
      janeSelectorBtn.classList.add("active-person");
      janeSelectorBtn.disabled = true;
      johnSelectorBtn.disabled = false;
      johnSelectorBtn.classList.remove("active-person");
    }
    chatInput.focus();
  };

  function handleSelectorClick(senderName) {
    updateMessageSender(senderName);

    var elements = document.querySelectorAll(".lighter-bg, .darker-bg");
    elements.forEach(function (element) {
      element.classList.toggle("lighter-bg");
      element.classList.toggle("darker-bg");
    });
  }

  johnSelectorBtn.addEventListener("click", function () {
    handleSelectorClick("John");
  });

  janeSelectorBtn.addEventListener("click", function () {
    handleSelectorClick("Jane");
  });

  const createChatMessageElement = (message) => `
    <div class="message ${
      message.sender === "John" ? "john-message" : "jane-message"
    } ${message.sender === messageSender ? "lighter-bg" : "darker-bg"} ">
        <div class="message-sender">${message.sender}</div>
        <div class="message-text">${message.text}</div>
        <div class="message-timestamp">${message.timestamp}</div>
    </div>
`;

  messages.forEach((message) => {
    chatMessages.innerHTML += createChatMessageElement(message);
  });

  const sendMessage = (e) => {
    e.preventDefault();
    const timestamp = new Date().toLocaleString("pt-BR", {
      hour: "numeric",
      minute: "numeric",
    });
    const message = {
      sender: messageSender,
      text: chatInput.value,
      timestamp,
    };
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
    chatMessages.innerHTML += createChatMessageElement(message);
    chatInputForm.reset();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  chatInputForm.addEventListener("submit", sendMessage);

  clearChatBtn.addEventListener("click", () => {
    localStorage.clear();
    chatMessages.innerHTML = "";
  });
};
