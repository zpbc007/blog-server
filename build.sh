#!/bin/bash
cd ~/repository/blog-server/
git pull origin master
sudo pm2 restart all
echo 'travis build done!'
exit 0