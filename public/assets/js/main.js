let translateButton = document.querySelector("#translateButton")

translateButton.addEventListener("click", async() => {
    let inputText = document.querySelector("#inputText")
    const text = inputText.value.trim()
    const targetLang = document.querySelector("#targetLang").value

    if (!text) return false

    const userMessage = document.createElement("div")
    userMessage.className = "chat_message chat_message-user"
    userMessage.textContent = text

    const messagesContainer = document.querySelector(".chat_messages")
    messagesContainer.appendChild(userMessage)
    messagesContainer.scrollTop = messagesContainer.scrollHeight

    try {
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({text, targetLang}),
        })

        const data = await response.json()

        if (response.ok) {
            const botMessage = document.createElement("div")
            botMessage.className = "chat_message chat_message-bot"
            botMessage.textContent = data.translatedText
            messagesContainer.appendChild(botMessage)
            messagesContainer.scrollTop = messagesContainer.scrollHeight
        } else {
            if (data.error && (data.message.includes("quota") || data.message.includes("tokens"))) {
                const alertMessage = document.createElement("div")
                alertMessage.className = "chat_message chat_message-alert"
                alertMessage.textContent = "¡Tokens agotados! Se han acabado los tokens disponibles. Por favor, intentalo en otro momento."
                messagesContainer.appendChild(alertMessage)
                messagesContainer.scrollTop = messagesContainer.scrollHeight
            } else {
                // Manejo de otros errores
                const errorMessage = document.createElement("div")
                errorMessage.className = "chat_message chat_message-error"
                errorMessage.textContent = "Ocurrió un error al traducir. Inténtelo de nuevo."
                messagesContainer.appendChild(errorMessage)
                messagesContainer.scrollTop = messagesContainer.scrollHeight
            }
        }
        

    } catch (error) {
        console.error("Error:", error)
        const errorMessage = document.createElement("div")
        errorMessage.className = "chat_message chat_message-error"
        errorMessage.textContent = "Error de conexión. Compruebe su internet."
        messagesContainer.appendChild(errorMessage)
        messagesContainer.scrollTop = messagesContainer.scrollHeight
    }

    inputText.value = ""
})