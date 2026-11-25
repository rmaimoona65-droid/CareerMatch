
from flask import Flask, render_template

app = Flask(__name__)

# Home Page
@app.route("/")
def home():
    return render_template("index.html")


# Test API
@app.route("/test")
def test():
    return {
        "message": "CareerMatch is working successfully!"
    }


if __name__ == "__main__":
    app.run(debug=True)

