package Juniper;


import java.awt.List;
import java.net.InetSocketAddress;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.jsp.JspWriter;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.mapred.ClusterStatus;
import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapred.JobID;
//import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapred.JobStatus;
import org.apache.hadoop.mapred.JobTracker;
import org.apache.hadoop.mapred.TaskTrackerStatus;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.mapred.jobtracker_jsp;
import org.apache.commons.collections.Predicate;

public class javatrial {
	
	public static String[] jobids=new String[0];
	public static String[] starttimes=new String[0];
	public static String[] mapprogress=new String[0];
	public static String[] reduceprogress=new String[0];
	public static int map=0;
	public static int reduce=0;
	public static int max_map=0;
	public static int max_reduce=0;
	public static boolean hadoop_available=true;
	public static String log="start";
	public static HashMap<String,Integer> graph = new HashMap<String,Integer>();
	
	public static void method(){
	
		graph.put("SUCCEEDED",0 );
		graph.put("FAILED",0 );
		graph.put("PREP",0 );
		graph.put("KILLED",0 );
		graph.put("RUNNING",0 );
	Configuration conf = new Configuration();
    conf.addResource(new Path(
            "/home/sambu/Downloads/core-site.xml"));
    conf.addResource(new Path(
            "/home/sambu/Downloads/hdfs-site.xml"));
    conf.addResource(new Path(
            "/home/sambu/Downloads/mapred-site.xml"));
	
    //System.out.println("1");
    try{
    InetSocketAddress jobtracker = new InetSocketAddress("10.0.0.162", 9001);
    JobClient jobClient = new JobClient(jobtracker, conf);
    jobClient.setConf(conf);
    JobStatus[] jobs = jobClient.jobsToComplete();
    
	
    //JobConf job = new JobConf(conf);
    //JobTracker jt = new JobTracker(job
    //org.apache.hadoop.mapreduce.server.jobtracker.TaskTracker
    ClusterStatus clusterStatus = jobClient.getClusterStatus(true);
    //ArrayList<String> tasktrackernames =(ArrayList)clusterStatus.getActiveTrackerNames();
    //TaskTrackerStatus tasktrackers=new TaskTrackerStatus(tasktrackernames.get(1),"10.189.136.115",50060,new List<TaskStatus>,0,clusterStatus.getMaxMapTasks(),clusterStatus.getMaxReduceTasks());
    //int a=objt.countMapTasks();
    //System.out.println("Trackername "+a);
    
    //JobTracker jt=JobTracker.startTracker(new JobConf(conf));
    //ArrayList<TaskTrackerStatus> a= (ArrayList)jt.activeTaskTrackers();
    log="here";
    JedisPoolConfig  jed=new JedisPoolConfig();
    JedisPool pool = new JedisPool(jed, "localhost");
    Jedis jedis = pool.getResource();
    log="here1";
    Calendar cal=Calendar.getInstance();
    SimpleDateFormat sdf=new SimpleDateFormat("dd/MMM/YYYY HH:mm:ss");
    map = clusterStatus.getMapTasks(); 
    reduce = clusterStatus.getReduceTasks(); 
    max_map = clusterStatus.getMaxMapTasks();
    max_reduce = clusterStatus.getMaxReduceTasks();
    jedis.hset("mapcount", cal.getTime().toString(),Integer.toString(map) );
    jedis.hset("reducecount", cal.getTime().toString(),Integer.toString(reduce) );
    jedis.hset("maxmap",cal.getTime().toString(),Integer.toString(max_map) );
    jedis.hset("maxreduce", cal.getTime().toString(),Integer.toString(max_reduce) );
    log="here2";
    JobStatus[] jobstatus=jobClient.getAllJobs();
    for (JobStatus itr: jobstatus)
    {
    	Date date=new Date(itr.getStartTime());
    	jedis.hset("Jobids", itr.getJobID().toString(),itr.getJobRunState(itr.getRunState()) );
        jedis.hset("starttimes", itr.getJobId().toString(),sdf.format(date) );
        jedis.hset("mapprogress", itr.getJobId().toString(),Float.toString(itr.mapProgress()) );
        jedis.hset("reduceprogress", itr.getJobId().toString(),Float.toString(itr.reduceProgress()) );
    }
    log="here3";
    //System.out.println("Reached here0");
    System.out.println("Reached here");
    jobids=new String[jobstatus.length];
    starttimes=new String[jobstatus.length];
    mapprogress=new String[jobstatus.length];
    reduceprogress=new String[jobstatus.length];
    System.out.println("Reached here1");
    log="here4";
    int i=0;
    for (JobStatus itr: jobstatus)
    {
    jobids[i] = jedis.hget("Jobids",itr.getJobId().toString());
    starttimes[i] = jedis.hget("starttimes",itr.getJobId().toString());
    mapprogress[i] = jedis.hget("mapprogress",itr.getJobId().toString());
    reduceprogress[i] = jedis.hget("reduceprogress",itr.getJobId().toString());
    if(graph.isEmpty())
    graph.put(jobids[i], 1);
    else if(graph.containsKey(jobids[i]))
    {
    	graph.put(jobids[i], graph.get(jobids[i])+1);
    }
    i++;
    }
    log="here5";
    //graph part
 
    
    System.out.println("Reached here2");
    pool.returnResource(jedis);
    pool.destroy();
    }catch(Exception e)
    {
    //	System.out.println("hey");
    	System.out.println("Hadoop Not available........... please run hadoop first"+log);
    	e.printStackTrace();
    	hadoop_available=false;	
    	
    }
	
	}
	
	
}
