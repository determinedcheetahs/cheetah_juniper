<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Hadoop Administration</title>

    <!-- Bootstrap Core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="css/sb-admin.css" rel="stylesheet">

    
    <link href="font-awesome-4.1.0/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="css/footable.core.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-1.11.0.js"></script>

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
    <script src="js/highcharts.js"></script>
    <script src="js/exporting.js"></script>
    <script src="js/spin.min.js"></script>
  <!--  <script src="js/no-data-to-display.js"></script>-->
    <script src="js/footable.js" type="text/javascript"></script>
    <script src="js/footable.filter.js" type="text/javascript"></script>
    <script src="js/footable.paginate.js" type="text/javascript"></script>
    <!--<script type='text/javascript' src='js/filters.js'></script>
    <script type='text/javascript' src='js/ajax_calls.js'></script>
    <script type='text/javascript' src='js/chart_generation.js'></script>
    <script type='text/javascript' src='js/dropdown_events.js'></script>-->
     <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <%Integer graphsucceded= (Integer)request.getAttribute("graph.succeded"); %>
    <%Integer graphprep= (Integer)request.getAttribute("graph.prep"); %>
    <%Integer graphfailed= (Integer)request.getAttribute("graph.failed"); %>
    <%Integer graphkilled= (Integer)request.getAttribute("graph.killed"); %>
    <%Integer graphrunning= (Integer)request.getAttribute("graph.running"); %>
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(drawChart);
      function drawChart() {
		var succeded=<%=graphsucceded%>;
		var prep=<%=graphprep%>;
		var failed=<%=graphfailed%>;
		var killed=<%=graphkilled%>;
		var running=<%=graphrunning%>;
        var data = google.visualization.arrayToDataTable([
          ['Status', 'No of Tasks'],
          ['SUCCEDED', succeded],
          ['FAILED', failed],
          ['PREP',  prep],
          ['KILLED', killed],
          ['RUNNING', running]
        ]);

        var options = {
          title: 'Tasks per Status'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      }
    </script>
    
    <script type="text/javascript">
    $(function () {
    $('.footable').footable();
  });
    </script>
    <script type="text/javascript">
    
   var chart_bar;
   var chart_pie;    
   var selected_year;
   var selected_org;
   var selected_period;
   var is_year_selected = 0;
   var is_sales_selected = 0;
   var is_period_selected = 0;
   var period = [];

   
  //---------------------------------Populating the dropdown ---------------------------------------
 

  
    
    //---------------------------------------------end of dropdown-----------------------------------------------
    //------------------------generate charts--------------------------------------------------------------------
    
    
    </script>
</head>

<body>
 
<% String[] jobids= (String[])request.getAttribute("jobids"); %>
<% String[] starttimes= (String[])request.getAttribute("starttimes"); %>
<% String[] mapprogress= (String[])request.getAttribute("mapprogress"); %>
<% String[] reduceprogress= (String[])request.getAttribute("reduceprogress"); %>
<% int map= Integer.parseInt(request.getAttribute("map").toString()); %>
<% int reduce= Integer.parseInt(request.getAttribute("reduce").toString());%>
<% int maxmap= Integer.parseInt(request.getAttribute("max_map").toString()); %>
<% int maxreduce= Integer.parseInt(request.getAttribute("max_reduce").toString()); %>
<% boolean hadoopavailable= (Boolean)request.getAttribute("hadoopavailable");%>
<img src="ajax-loader.gif" id="loading-indicator" style="display:none" />

        <div id="page-wrapper">

            <div class="container-fluid">
               
                
               

               
                 <div class="row">
                   <div class="navbar  navbar-default">
                    <div class="container">
                      <div class="navbar-header">

                   <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                        <!--    <a class="navbar-brand" href="#">Select Filters</a>-->
                          </div>
                  <!--      <div class="navbar-collapse collapse">
                            <ul class="nav navbar-nav">
                              
                                <li class="dropdown dr1">
                                    <a href="#" data-toggle="dropdown">Sales Organization <b class="caret"></b></a>
                                    <ul class="dropdown-menu drop_menu2">
                                        
                                    </ul>
                                </li>
                               <li class="dropdown dr2">
                                    <a href="#"  data-toggle="dropdown">Year<b class="caret"></b></a>
                                    <ul class="dropdown-menu drop_menu">
                                       
                                    </ul>
                                </li>
                                <li class="dropdown dr3">
                                    <a href="#"  data-toggle="dropdown">Period <b class="caret"></b></a>
                                    <ul class="dropdown-menu drop_menu3">
                                       
                                    </ul>
                                </li>
                                  <li class="active reset">
                                    <a href="#">Reset </a>
                                </li>
                            </ul>
                        </div>
                    -->
                    </div>
                </div>
                 </div> 
                <!-- /.row -->

                <div class="col-lg-12">

                     
                      <ol class="breadcrumb">
                             <h4 class="cluster_detail">
                                Cluster Status: <% if(hadoopavailable){ if(jobids.length>0){%>Up And Running<%}else{%>No Jobs Running<%}}else{%>Down<%}%>
                             </h4>         
                    
                       </ol>
                </div>
                <div class="row">
                    <div class="col-lg-6">
                        <div class="panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title"><i class="fa fa-bar-chart-o"></i> Status Comparison</h3>
                            </div>
                            <div class="panel-body">
                              <!--  <div class="flot-chart">-->
                              <%
									if(!(graphsucceded==0 && graphfailed==0 && graphprep==0 && graphkilled==0 && graphrunning==0)){
                                %>    
								<div id="piechart" ></div>
									<% }%>
                                <!--</div>-->
                            </div>
                        </div>
                    </div>
               
                <!-- /.row -->

               
                    <div class="col-lg-6">
                        <div class="panel panel-green">
                            <div class="panel-heading">
                                <h3 class="panel-title"><i class="fa fa-long-arrow-right"></i> Comparison</h3>
                            </div>
                            <div class="panel-body">
                               <!-- <div class="flot-chart">-->
                                    <div class="flot-chart-content" id="containerPie"></div>
                                <!--</div>-->
                                
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-lg-12">

                     
                      
                      
                       <ol class="breadcrumb">
                             <h4 class="Map_Count">
                                Total Map Count: <%=map%>
                             </h4>         
                    
                       </ol>

                        <ol class="breadcrumb">
                             <h4 class="Reducer_Count">
                                Total Reducer Count: <%=reduce%>
                             </h4>         
                    
                       </ol>

                        <ol class="breadcrumb">
                             <h4 class="Maximum_Map">
                                Maximum Map Count: <%=maxmap%>
                             </h4>         
                    
                       </ol>
                        
                         <ol class="breadcrumb">
                             <h4 class="Maximum_Reducer">
                                Maximum Reducer Count: <%=maxreduce%>
                             </h4>         
                    
                       </ol>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 ">
                        <div >
                        	<%if(jobids.length>0){%>
                            <table data-filter="#filter" class="footable table table-bordered table-hover table-striped" id="my-table">
                                <thead>
                                    <tr>
                                        <th >JobID</th>
                                        <th data-hide="phone">Start-Time</th>
                                        <th data-hide="phone">Map Progress</th>
                                        <th data-hide="phone">Reduce Progress </th>

                                    </tr>

                                </thead>
									
                                 <tbody>
                                 		<%for(int i=0;i<jobids.length;i++){%>
                                       <tr>
                                       <th><%=jobids[i]%></th>
                                       <th><%=starttimes[i]%></th>
                                       <th><%=mapprogress[i]%></th>
                                       <th><%=reduceprogress[i]%></th>
                                       </tr>
                                       <%}%>
                                 </tbody>
                                 <tfoot class="hide-if-no-paging">
                                    <tr>
                                        <td colspan="5" class="text-center">
                                                <ul class="pagination"></ul>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                            <% }else {%>
                            Currently no jobs running...
                            <%}%>
                        </div>

                    </div>
                </div>
             

            </div>
            <!-- /.container-fluid -->

        </div>
        <!-- /#page-wrapper -->

   
    <!-- /#wrapper -->

    <!-- jQuery Version 1.11.0 -->
    
    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

<form name="myForm" action="Servlet1" method="post">
</form>	
</body>
<Script>
var delay=3000;
setTimeout(function(){
document.myForm.submit();},delay);
</Script>
   
</body>

</html>
