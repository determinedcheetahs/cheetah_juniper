-----------------------------------------------------------------------------------
Prerequistive
-----------------------------------------------------------------------------------

   $ sudo apt-get install openjdk-7-jdk
   $ java -version
   java version "1.7.0_25"
   OpenJDK Runtime Environment (IcedTea 2.3.12) (7u25-2.3.12-4ubuntu3)
   OpenJDK 64-Bit Server VM (build 23.7-b01, mixed mode)
   $ cd /usr/lib/jvm
   $ ln -s java-7-openjdk-amd64 jdk
   $ sudo apt-get install openssh-server

-----------------------------------------------------------------------------------
Getting Started
-----------------------------------------------------------------------------------

1. Adding a dedicated Hadoop system user "hduser"
   We will use a dedicated Hadoop user account for running Hadoop. While that’s not 
   required it is recommended because it helps to separate the Hadoop installation 
   from other software applications and user accounts running on the same machine

   $ sudo addgroup hadoop
   $ sudo adduser --ingroup hadoop hduser
   $ sudo adduser hduser sudo

2. Setup SSH Certificate

   $ su - hduser
   $ ssh-keygen -t rsa -P ''
   $ cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
   $ ssh localhost

3. Download the complete setup which includes hadoop 1.2.1 package configured 
   for multinode cluster setup along with java code to communicate with JobTracker 
   using Hadoop RPC:

   $ git clone https://github.com/determinedcheetahs/cheetah_juniper.git

   Move hadoop folder to /usr/local/

4. Assign the IP address  for the master machine and slave machine. 
   Update /etc/hosts on both machines with these IP addresses:

   example /etc/hosts (for both master AND slave nodes)
   
   192.168.0.1    master
   192.168.0.2    slave

5. Distribute the SSH public key of hduser@master

   hduser@master:~$ ssh-copy-id -i $HOME/.ssh/id_rsa.pub hduser@slave

   Check if you are able to ssh to master and slave nodes without providing password
   connecting from master to master…

   hduser@master:/usr/local/hadoop$ ssh master
   Welcome to Ubuntu 14.04.1 LTS (GNU/Linux 3.13.0-39-generic x86_64)

    * Documentation:  https://help.ubuntu.com/

   Last login: Thu Nov 13 18:11:29 2014 from master
   hduser@master:~$ 

      …and from master to slave.

   hduser@master:/usr/local/hadoop$ ssh slave
   Welcome to Ubuntu 14.04.1 LTS (GNU/Linux 3.13.0-35-generic x86_64)

    * Documentation:  https://help.ubuntu.com/

   162 packages can be updated.
   78 updates are security updates.

   Last login: Thu Nov 13 18:11:17 2014 from master
   hduser@slave:~$ 


-----------------------------------------------------------------------------------
Configuration
-----------------------------------------------------------------------------------

1. conf/masters (master only)

   On master, update conf/masters that will have entry for master:

   conf/masters (on master)
   
   master

2. conf/slaves (master only)
   The conf/slaves file lists the hosts, one per line, where the Hadoop slave 
   daemons (DataNodes and TaskTrackers) will be run. We want both the master 
   box and the slave box to act as Hadoop slaves because we want both of them 
   to store and process data.

   On master, update conf/slaves that will have enries for master and slave:

   conf/slaves (on master)

   master
   slave

3. conf/*-site.xml (all machines)

   You must change the configuration files conf/core-site.xml, 
   conf/mapred-site.xml and conf/hdfs-site.xml on ALL machines as follows.

   First, we have to change the fs.default.name parameter (in conf/core-site.xml), 
   which specifies the NameNode (the HDFS master) host and port. 
   In our case, this is the master machine.

   conf/core-site.xml (ALL machines)

   <property>
		  <name>fs.default.name</name>
		  <value>hdfs://master:9000</value>
		  <description>The name of the default file system.  A URI whose
		  scheme and authority determine the FileSystem implementation.  The
		  uri's scheme determines the config property (fs.SCHEME.impl) naming
		  the FileSystem implementation class.  The uri's authority is used to
		  determine the host, port, etc. for a filesystem.</description>
   </property>

	Second, we have to change the mapred.job.tracker parameter 
	(in conf/mapred-site.xml), which specifies the JobTracker 
	(MapReduce master) host and port. Again, this is the master in our case.

	conf/mapred-site.xml (ALL machines)

	<property>
		<name>mapred.job.tracker</name>
  		<value>master:9001</value>
  		<description>The host and port that the MapReduce job tracker runs
  		at.  If "local", then jobs are run in-process as a single map
  		and reduce task.
  		</description>
	</property>

	Third, we change the dfs.replication parameter (in conf/hdfs-site.xml) 
	which specifies the default block replication. It defines how many 
	machines a single file should be replicated to before it becomes 
	available. If you set this to a value higher than the number of 
	available slave nodes (more precisely, the number of DataNodes), 
	you will start seeing a lot of “(Zero targets found, forbidden1.size=1)” 
	type errors in the log files.

	The default value of dfs.replication is 3. However, we have only 
	two nodes available, so we set dfs.replication to 2.

	conf/hdfs-site.xml (ALL machines)

	<property>
  		<name>dfs.replication</name>
  		<value>2</value>
  		<description>Default block replication.
  		The actual number of replications can be specified when the file is created.
  		The default is used if replication is not specified in create time.
  		</description>
	</property>


-----------------------------------------------------------------------------------
Formatting the HDFS filesystem via the NameNode
-----------------------------------------------------------------------------------

	Before we start our new multi-node cluster, we must format Hadoop’s 
	distributed filesystem (HDFS) via the NameNode. You need to do this 
	the first time you set up an Hadoop cluster.

	To format the filesystem (which simply initializes the directory 
	specified by the dfs.name.dir variable on the NameNode), run the command

	Format the cluster’s HDFS file system

	hduser@master:/usr/local/hadoop$ bin/hadoop namenode -format
	... INFO dfs.Storage: Storage directory /app/hadoop/tmp/dfs/name has been successfully formatted.
	hduser@master:/usr/local/hadoop$

-----------------------------------------------------------------------------------
Starting the multi-node cluster
-----------------------------------------------------------------------------------

	hduser@master:/usr/local/hadoop$ bin/start-all.sh

	starting namenode, logging to /usr/local/hadoop/libexec/../logs/hadoop-hduser-namenode-master.out
	master: starting datanode, logging to /usr/local/hadoop/libexec/../logs/hadoop-hduser-datanode-master.out
	slave2: starting datanode, logging to /usr/local/hadoop/libexec/../logs/hadoop-hduser-datanode-Amits-MacBook-Air.local.out
	slave1: starting datanode, logging to /usr/local/hadoop/libexec/../logs/hadoop-hduser-datanode-chandu.out
	master: starting secondarynamenode, logging to /usr/local/hadoop/libexec/../logs/hadoop-hduser-secondarynamenode-master.out
	starting jobtracker, logging to /usr/local/hadoop/libexec/../logs/hadoop-hduser-jobtracker-master.out
	master: starting tasktracker, logging to /usr/local/hadoop/libexec/../logs/hadoop-hduser-tasktracker-master.out
	slave1: starting tasktracker, logging to /usr/local/hadoop/libexec/../logs/hadoop-hduser-tasktracker-chandu.out
	slave2: starting tasktracker, logging to /usr/local/hadoop/libexec/../logs/hadoop-hduser-tasktracker-Amits-MacBook-Air.local.out

1. Java processes on master after starting HDFS daemons

	hduser@master:/usr/local/hadoop$ jps
	14799 NameNode
	15314 Jps
	14880 DataNode
	14977 SecondaryNameNode


	…and the following on slave.

	Java processes on slave after starting HDFS daemons

	hduser@slave:/usr/local/hadoop$ jps
	15183 DataNode
	15616 Jps
	hduser@slave:/usr/local/hadoop$


-----------------------------------------------------------------------------------
Stopping the HDFS layer
-----------------------------------------------------------------------------------

	hduser@master:/usr/local/hadoop$ bin/stop-dfs.sh
	stopping namenode
	slave: Ubuntu 10.04
	slave: stopping datanode
	master: stopping datanode
	master: stopping secondarynamenode
	hduser@master:/usr/local/hadoop$

2. Java processes on master after stopping HDFS daemons

	hduser@master:/usr/local/hadoop$ jps
	18670 Jps
	hduser@master:/usr/local/hadoop$


-----------------------------------------------------------------------------------
Running a MapReduce job
-----------------------------------------------------------------------------------

	sudo bin/hadoop dfs -copyFromLocal /home/hitesh/Downloads/hadoop/books /user/hduser/countw 
	sudo bin/hadoop jar hadoop*examples*.jar wordcount /user/hduser/countw /user/hduser/count_op9
