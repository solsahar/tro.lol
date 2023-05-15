from gevent import monkey
monkey.patch_all()
from http import server
from flask import request, redirect, Flask, json, render_template, send_file
from gevent import pywsgi
import json
import subprocess

website = Flask(__name__)

@website.route('/', methods=['GET'])
def trolol():
    return render_template('index.html')

if __name__ == '__main__':
    app_server = pywsgi.WSGIServer(('0.0.0.0', 80), website)
    app_server.serve_forever()
