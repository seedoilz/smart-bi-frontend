export PATH=$PATH:/node-v20.4.0-linux-x64/bin/
rm -rf dist

cnpm run build
mv -f /var/lib/jenkins/workspace/smart_bi_frontend/dist /etc/nginx
nginx -s reload
