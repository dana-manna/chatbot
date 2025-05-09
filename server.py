from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import difflib  # إضافة مكتبة difflib للمقارنة بين النصوص

# تحميل البيانات من ملف intents.json
def load_intents():
    with open('dataset.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
        return {intent['intent']: intent for intent in data}

# تحميل النوايا والكلمات المفتاحية والردود من الملف
intents = load_intents()

app = Flask(__name__)
CORS(app)

# دالة لاكتشاف النية بناءً على الرسالة
def detect_intent(user_message):
    user_message = user_message.lower()

    # المرور عبر جميع النوايا
    for intent, data in intents.items():
        # نبحث داخل "pairs" التي تحتوي على "text" و "response"
        for pair in data.get("pairs", []):
            # استخدام difflib لمقارنة النصوص
            matches = difflib.get_close_matches(user_message, [pair.get("text", "").lower()], n=1, cutoff=0.8)
            if matches:  # إذا كان هناك تطابق قريب
                return intent, pair.get("response")  # نرجع النية والرد

    return "unknown", "عذراً، لم أفهم ما تعنيه."  # إذا لم يتم العثور على تطابق

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")
    intent, reply = detect_intent(user_message)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
