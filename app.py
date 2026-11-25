

from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Home Page
@app.route("/")
def home():
    return render_template("index.html")


# Test Route
@app.route("/test")
def test():
    return jsonify({
        "message": "CareerMatch website is working successfully!"
    })


# Run Application
if __name__ == "__main__":
    app.run(debug=True)
