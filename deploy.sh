export PATH=$PATH:/node-v20.4.0-linux-x64/bin/
project_pid=`ps aux | grep "npm" | grep -v grep | awk 'END{print $2}'`
if [  $project_pid > 0 ];then
      echo "项目已经启动，开始关闭项目，项目pid为: $project_pid "
      echo "--------------------"
      pm2 stop all
      echo '项目关闭成功，开始重启项目 '
      echo "--------------------"
else
      echo "项目未启动，直接启动"
      echo "--------------------"
fi

pm2 start "/node-v20.4.0-linux-x64/bin/npm" --name "smart_bi" -- start .
