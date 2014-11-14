<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Job Status</title>
</head>
<body>
<% String[] jobids= (String[])request.getAttribute("jobids"); %>
<% String[] starttimes= (String[])request.getAttribute("starttimes"); %>
<% String[] mapprogress= (String[])request.getAttribute("mapprogress"); %>
<% String[] reduceprogress= (String[])request.getAttribute("reduceprogress"); %>
<% int maptasks= Integer.parseInt(request.getAttribute("map").toString()); %>
<% int reducetasks= Integer.parseInt(request.getAttribute("reduce").toString());%>
<% boolean hadoopavailable= (Boolean)request.getAttribute("hadoopavailable");%>
<%if(hadoopavailable){ %>
CLuster Status<p>
<table>
<tr><td>No of Jobs</td><td>Mapper Count</td><td>Reducer Count</td></tr>
<tr>
<td><%=jobids.length %></td>
<td><%=maptasks %></td>
<td><%=reducetasks %></td>
</table>

<p>Currently Running Jobs...<p></p>
<% if(jobids.length>0){%>
<table>
<tr><td>Slno</td><td>JobId</td><td>StartTime</td></tr>
<%for(int i=0;i<jobids.length;i++) {%>
<tr>
<td><%=i %></td>
<td><%=jobids[i] %></td>
<td><%=starttimes[i] %></td>
</tr>
<%} %>
</table>
<%}else {%>
No Jobs Running
<%} %>
<p>Max map count is <%=request.getAttribute("max_map") %></p>
<p>Max reduce count is <%=request.getAttribute("max_reduce") %></p>
<p>Current map count is <%=request.getAttribute("map") %></p> 
<p>Current reduce count is <%=request.getAttribute("reduce") %></p>
<%}else{ %>
Hadoop Not available... Please run Hadoop first...
<%} %>
<form name="myForm" action="Servlet1" method="post">
</form>	
</body>
<Script>
var delay=3000;
setTimeout(function(){
document.myForm.submit();},delay);
</Script>

</html>