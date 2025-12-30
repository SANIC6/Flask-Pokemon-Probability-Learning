from flask import Flask, render_template, jsonify
import mimetypes

# Fix for Windows Registry MIME type issue
mimetypes.add_type('application/javascript', '.js')

app = Flask(__name__, template_folder='../templates', static_folder='../static')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy", "message": "Pokemon Probability Academy is running!"})

@app.route('/robots.txt')
def robots():
    return app.send_static_file('robots.txt')

@app.route('/sitemap.xml')
def sitemap():
    return app.send_static_file('sitemap.xml')

if __name__ == '__main__':
    app.run(debug=True)
