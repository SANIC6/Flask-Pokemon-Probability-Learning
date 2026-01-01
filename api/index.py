import os
from flask import Flask, render_template, jsonify, send_from_directory
import mimetypes

# Fix for Windows Registry MIME type issue
mimetypes.add_type('application/javascript', '.js')

app = Flask(__name__, template_folder='../templates', static_folder='../static')

# Dashboard (new home page)
@app.route('/')
def dashboard():
    return render_template('dashboard.html')

# Individual lesson page
@app.route('/lesson/<int:lesson_id>')
def lesson(lesson_id):
    # Validate lesson ID
    if lesson_id < 1 or lesson_id > 10:
        return "Lesson not found", 404
    
    # Pass lesson_id to template
    return render_template('lesson.html', lesson_id=lesson_id, lesson={'title': 'Loading...'})

# Legacy route (redirect to dashboard)
@app.route('/old')
def old_home():
    return render_template('index.html')

@app.route('/api/health')
def health():
    return jsonify({"status": "healthy", "message": "Pokemon Probability Academy is running!"})

@app.route('/robots.txt')
def robots():
    return send_from_directory(os.path.join(app.root_path, '../static'), 'robots.txt')

@app.route('/sitemap.xml')
def sitemap():
    return send_from_directory(os.path.join(app.root_path, '../static'), 'sitemap.xml')

if __name__ == '__main__':
    app.run(debug=True)
