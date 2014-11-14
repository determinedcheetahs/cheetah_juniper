#/bin/sh

/usr/local/hadoop/bin/stop-all.sh
sudo rm -rf /tmp/hadoop-hduser/dfs/name/*
sudo rm -rf /tmp/hadoop-hduser/dfs/data/*
sudo rm -rf /tmp/hadoop-hduser/dfs/namesecondary/*
/usr/local/hadoop/bin/hadoop namenode -format
/usr/local/hadoop/bin/start-all.sh 

jps
