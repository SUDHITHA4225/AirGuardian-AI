import google.generativeai as genai

from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.0-flash")


def ask_gemini(question: str):
    prompt = f"""
You are AirGuardian AI.

You are an industrial safety assistant.

Answer professionally.

Question:

{question}
"""

    try:
        response = model.generate_content(prompt)

        if not response.text:
            return "Gemini returned an empty response."

        return response.text

    except Exception as e:
        print("\n========== GEMINI ERROR ==========")
        print(e)
        print("==================================\n")
        raise