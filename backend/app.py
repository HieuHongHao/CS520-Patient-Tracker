import os
import psycopg2
from dotenv import load_dotenv
from flask import Flask, request
from flask_restful import Api, Resource

load_dotenv()
app = Flask(__name__)
api = Api(app)
DATABASE_URL = os.getenv('DATABASE_URL')

def get_db_connection():
    return psycopg2.connect(DATABASE_URL)

class Register(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')  # In a real app, you'd hash this

        conn = get_db_connection()
        cur = conn.cursor()

        # Check if user exists
        cur.execute("SELECT 1 FROM users WHERE username=%s", (username,))
        if cur.fetchone():
            cur.close()
            conn.close()
            return {"message": "User already exists."}, 400

        # Insert user into the database
        cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        conn.commit()

        cur.close()
        conn.close()

        return {"message": f"User {username} created successfully."}, 201

class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        conn = get_db_connection()
        cur = conn.cursor()

        # Fetch user from the database
        cur.execute("SELECT password FROM users WHERE username=%s", (username,))
        result = cur.fetchone()

        cur.close()
        conn.close()

        if not result or result[0] != password:  # In a real app, you'd compare hashed passwords
            return {"message": "Invalid credentials."}, 401

        return {"message": f"Logged in as {username}."}, 200

api.add_resource(Register, '/register')
api.add_resource(Login, '/login')

if __name__ == '__main__':
    app.run(debug=True)
