from flask import Flask, escape, request
import numpy as np
import pickle
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = pickle.load(open('model.pkl','rb'))

@app.route('/')
def hello():
    name = request.args.get("name", "World")
    return 'Hello'
	
@app.route('/predict',methods=['POST'])
def predict():
	data = request.get_json(force=True)
	features = [np.array(data['data'])]
	prediction = model.predict(features)
	return str(prediction[0])

if __name__ == "__main__":
    app.run(debug=True)		