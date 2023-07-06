export PATH=$PATH:/node-v20.4.0-linux-x64/bin/
npm install
setsid npm start >/dev/null 2>&1 < /dev/null &
