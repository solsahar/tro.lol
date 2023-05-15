from gevent import monkey
monkey.patch_all()
from http import server
from flask import request
from flask import redirect
from flask import Flask, json, render_template
from flask import send_file
import gevent.pywsgi
import json
import subprocess
website = Flask(__name__)
@website.route('/',methods=['GET'])
    return render_template('index.html')

if __name__ == '__main__':
    app_server = gevent.pywsgi.WSGIServer(('0.0.0.0',443), website)
    app_server.serve_forever()
