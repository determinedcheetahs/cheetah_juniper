package Juniper;

import java.io.IOException;

import org.apache.commons.collections.Predicate;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.mapred.ClusterStatus;
import org.apache.hadoop.mapred.JobClient;
import org.apache.hadoop.mapred.JobConf;
import org.apache.hadoop.mapred.JobID;
//import org.apache.hadoop.mapreduce.*;
import org.apache.hadoop.mapred.JobStatus;
import org.apache.hadoop.mapred.JobTracker;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;


/**
 * Servlet implementation class Servlet1
 */
@WebServlet("/Servlet1")
public class Servlet1 extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public Servlet1() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		//sresponse.setIntHeader("Service.Servlet1",5);
		javatrial obj=new javatrial();
		
		System.out.println("Before calling");
		javatrial.method();
		System.out.println("After calling");
        request.setAttribute("jobids", javatrial.jobids);
        request.setAttribute("starttimes",javatrial.starttimes);
        request.setAttribute("mapprogress",javatrial.mapprogress);
        request.setAttribute("reduceprogress",javatrial.reduceprogress);
        request.setAttribute("map", javatrial.map);
        request.setAttribute("reduce", javatrial.reduce);
        request.setAttribute("max_map", javatrial.max_map);
        request.setAttribute("max_reduce", javatrial.max_reduce);
        request.setAttribute("hadoopavailable",javatrial.hadoop_available);
        request.setAttribute("graph.succeded",javatrial.graph.get("SUCCEEDED"));
        request.setAttribute("graph.prep",javatrial.graph.get("PREP"));
        request.setAttribute("graph.running",javatrial.graph.get("RUNNING"));
        request.setAttribute("graph.killed",javatrial.graph.get("KILLED"));
        request.setAttribute("graph.failed",javatrial.graph.get("FAILED"));
        /*
        request.setAttribute("graph.succeded",6);
        request.setAttribute("graph.prep",3);
        request.setAttribute("graph.running",5);
        request.setAttribute("graph.killed",7);
        request.setAttribute("graph.failed",0);
        */
        System.out.println("size is "+javatrial.graph.size());
        request.getRequestDispatcher("/View/main1.jsp").forward(request,response);
		
      }
		
	}
