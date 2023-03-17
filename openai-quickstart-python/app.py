import os

import openai
from flask import Flask, redirect, render_template, request, url_for
from flask_cors import CORS

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")
CORS(app, resources=r'/*')


@app.route("/", methods=("GET", "POST"))
def index():
    # chapgpt api
    if request.method == "POST":
        prompt = request.form["prompt"]
        response = openai.ChatCompletion.create(
            # chapgpt
            model="gpt-3.5-turbo",
            messages=[{"content": prompt, "role": "user"}],
            temperature=0.2,
        )
        return response.choices[0].message.content
    # 预检请求
    if request.method == "OPTIONS":
        return response