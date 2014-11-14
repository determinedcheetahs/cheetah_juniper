$().ready(function(){

    // $('.footable').trigger('footable_initialize');
    //-------------------------------Spin.js  Properties declaration-----------------------------------------------------------------
    var opts = {
        lines: 13, // The number of lines to draw
        length: 20, // The length of each line
        width: 10, // The line thickness
        radius: 30, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
        //-------------------------------Spin.js  Properties declaration  ENDS-----------------------------------------------------------------
};
var target = document.getElementById('wrapper');

           
            generate_bar();
            generate_pie();
            generate_Table();
            
            $('.detail_text').append("showing data for all years, period and Sales Organization");

//------------------Click event for dropdown menu---------------------------------------------------------

     $('.drop_menu').on("click","li a",function(){
               $('#loading-indicator').modal('show');
               var spinner = new Spinner(opts).spin(target); 
               selected_year = $(this).text();
               is_year_selected = 1;
               filter_year();
              
               generate_bar();
               generate_pie();
               $('#my-table > tbody').empty();
               generate_Table();
           //   $('table').trigger('footable_redraw');
               spinner.stop();
               $('#loading-indicator').modal('hide')
               $('.dr2 > a').empty();
              $('.dr2 > a').append("year"+" ("+selected_year+")");
              $('.dr2 > a').append('<b class="caret"></b>');

    });

    $('.drop_menu2').on("click","li a",function(){
              
                is_sales_selected = 1;
                $('#loading-indicator').modal('show');
                var spinner1 = new Spinner(opts).spin(target);
                selected_org = $(this).text();
                $('.detail_text').empty();
                filter_org();
              
                generate_bar();
                generate_pie();
                $('#my-table > tbody').empty();
                generate_Table();
           //   $('table').trigger('footable_redraw');
                spinner1.stop();
                $('#loading-indicator').modal('hide');
               $('.dr1 > a').empty();
              $('.dr1 > a').append("Sales Organization"+" ("+selected_org+")");
              $('.dr1 > a').append('<b class="caret"></b>');
   });
            
   $('.drop_menu3').on("click","li a",function(){
              is_period_selected=1;
              $('#loading-indicator').modal('show');
              var spinner1 = new Spinner(opts).spin(target);
              selected_period = $(this).text();
              $('.detail_text').empty();
             // period.push(selected_period);
              //alert(period.toString());
              filter_period();
              
              generate_bar();
              generate_pie();
              $('#my-table > tbody').empty();
              generate_Table();
             // $('table').trigger('footable_redraw');
              spinner1.stop();
              $('#loading-indicator').modal('hide');
              $('.dr3 > a').empty();
              $('.dr3 > a').append("Period"+" ("+selected_period+")");
              $('.dr3 > a').append('<b class="caret"></b>');
   });
             

   $('.reset').on("click",function(){
                location.reload(true);
                 $('.footable').trigger('footable_redraw');
         });
    });
  