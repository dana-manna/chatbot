function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    let chatBox = document.getElementById("chat-box");

    // عرض رسالة المستخدم
    let userMessage = document.createElement("div");
    userMessage.className = "message user-message";
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);

    document.getElementById("user-input").value = "";

    

    // إضافة رسالة "البوت يكتب..."
    let typingMessage = document.createElement("div");
    typingMessage.className = "message bot-message";
    typingMessage.innerHTML = '<span class="typing-animation"></span>';
    chatBox.appendChild(typingMessage);

    chatBox.scrollTop = chatBox.scrollHeight;

    // إرسال البيانات إلى الـ API
    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
    setTimeout(() => {
        let botMessageWrapper = document.createElement("div");
botMessageWrapper.style.display = "flex";
botMessageWrapper.style.alignItems = "flex-start";
botMessageWrapper.style.marginBottom = "10px";

// صورة البوت
let botImage = document.createElement("img");
botImage.src = "robot_image.jpg";
botImage.alt = "Bot";
botImage.style.width = "40px";
botImage.style.height = "40px";
botImage.style.borderRadius = "50%";
botImage.style.marginLeft = "10px";
botImage.style.marginTop = "10px";  // تنزل الصورة لتحت شوي
botImage.style.marginRight ="5px";

// رسالة البوت
let botMessage = document.createElement("div");
botMessage.className = "message bot-message";
botMessage.textContent = data.reply;

// ضفهم مع بعض
botMessageWrapper.appendChild(botImage);
botMessageWrapper.appendChild(botMessage);

// استبدل الرسالة المؤقتة
typingMessage.replaceWith(botMessageWrapper);
chatBox.scrollTop = chatBox.scrollHeight;

        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
})

    .catch(error => console.error("Error:", error));

    
}

//////////////////////
// عند الضغط على "Enter" داخل مربع الإدخال، يتم إرسال الرسالة
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {  // التحقق من الضغط على مفتاح Enter
        event.preventDefault();   // منع السلوك الافتراضي (السطر الجديد)
        sendMessage();            // استدعاء دالة الإرسال
    }
});




// زر التبديل بين الوضع الداكن والفاتح
document.getElementById("toggle-dark-mode").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // حفظ تفضيل المستخدم في Local Storage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        this.textContent = "☀️"; // أيقونة الشمس للوضع الفاتح
    } else {
        localStorage.setItem("darkMode", "disabled");
        this.textContent = "🌙"; // أيقونة القمر للوضع الداكن
    }
});

// التأكد من تطبيق الوضع الداكن عند تحميل الصفحة
window.onload = function () {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        document.getElementById("toggle-dark-mode").textContent = "☀️";
    }
};


document.getElementById('send-btn').addEventListener('click', () => {
    sendMessage();
});

document.getElementById('user-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});




// قائمة الإيموجيات
const emojiList = ["😊", "😂", "❤️", "👍", "🔥", "🎉", "😎", "🤔", "🥰", "😭", "👏", "😁", "🤩", "🙌", "💖", "😜", "😉", "😢", "🤯", "😴"];
const emojiContainer = document.getElementById("emoji-container");
const emojiBtn = document.getElementById("emoji-btn");
const emojiListDiv = document.getElementById("emoji-list");
const userInput = document.getElementById("user-input");

// توليد قائمة الإيموجيات
emojiList.forEach(emoji => {
    let span = document.createElement("span");
    span.textContent = emoji;
    span.addEventListener("click", function () {
        userInput.value += emoji; // إضافة الإيموجي إلى الإدخال
        emojiContainer.style.display = "none"; // إخفاء القائمة بعد الاختيار
    });
    emojiListDiv.appendChild(span);
});

// عند النقر على زر الإيموجي، عرض/إخفاء القائمة
emojiBtn.addEventListener("click", function (event) {
    event.stopPropagation(); // منع إغلاق القائمة عند النقر على الزر نفسه
    emojiContainer.style.display = emojiContainer.style.display === "block" ? "none" : "block";
});

// إخفاء القائمة عند النقر خارجها
document.addEventListener("click", function (event) {
    if (!emojiContainer.contains(event.target) && event.target !== emojiBtn) {
        emojiContainer.style.display = "none";
    }
});

document.getElementById("clear-chat").addEventListener("click", function () {
    document.getElementById("chat-box").innerHTML = ""; // حذف جميع الرسائل
});


document.getElementById("toggle-chat").addEventListener("click", function () {
    let chatBox = document.getElementById("chat-box");
    let chatInput = document.querySelector(".chat-input");

    if (chatBox.style.display === "none") {
        chatBox.style.display = "block";
        chatInput.style.display = "flex";
        this.textContent = "🔽";
    } else {
        chatBox.style.display = "none";
        chatInput.style.display = "none";
        this.textContent = "🔼";
    }
});







