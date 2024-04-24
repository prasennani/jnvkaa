﻿var selectUser = "";
$(document).ready(function () {
    // $('#preloader').css('display', 'flex');
    $('.loader').css('display', 'flex');
    var j = 0;
    getAllBatchUser();
    

    $('#user-head').on('click', '#editUser', function () {
        
        var col_num = $(this).children().index($(this));
        getUserData();
        
    });
    $('#selectUser').on('change', function () {
     //   $('#preloader').css('display', 'flex');
       // selectUser = $('#selectUser').val();
        // alert(selectUser);
        
        getUser();

    });
 
    
});

function getAllBatchUser() {
    $('.loader').css('display','flex');
    $('#usertable tbody').empty();
    $.ajax({
        url: "../WebService.asmx/getAllBatchusers",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: "{'utype': '2'}",
        success: function (response) {
           // alert(response.d);
            user = JSON.parse(JSON.parse(response.d));
            if (user[0].ustatus.localeCompare("521") === 0) {
                alert("No records found");
                $('.loader').css('display', 'none');
            }
            else if (user[0].ustatus.localeCompare("522") === 0)
                alert("Something went wrong. Please try again.");
            else {

                for (i = 0; i < user.length; i++) {
                    var txt = '<tr><th scope="row">' + (parseInt(i) + 1) + '</th>';
                    txt += '<td>' + user[i].fname + '</td>';
                    txt += '<td>' + user[i].sname + '</td>';
                    txt += '<td>' + user[i].batchno + '</td>';
                    txt += '<td>' + user[i].uphno + '</td>';
                    txt += '<td>' + user[i].uemail + '</td>';
                    switch (parseInt(user[i].ustatus)) {
                        case -2:
                            txt += '<td><div class="pending">Pending </div> </td>';
                            txt += '<td> <div class="pending"> Pending </div></td>';
                            break;
                        case -1:
                            txt += '<td><div class="approved">Approved </div> </td>';
                            txt += '<td> <div class="pending"> Pending </div></td>';
                            break;
                        case 1:
                            txt += '<td><div class="approved">Approved </div> </td>';
                            txt += '<td> <div class="approved"> Approved </div></td>';
                            break;
                        case 0:
                            txt += '<td><div class="blocked">Blocked</div> </td>';
                            txt += '<td> <div class="blocked"> Blocked </div></td>';
                            break;
                    }
                    //alert(user[i].uid);
                    txt += '<th><p><a class="link-info link-opacity-50-hover" id="editUser" href="editusers.html?e=' + user[i].uid + '"> Edit </a></p></th>';
                    $('#usertable tr:last').after(txt);
                }
                $('.loader').css('display', 'none');
                //j = i;
            }

        }

    }).done(function () {


    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });


    //Edit user data and getting data using button 




}

function getUser() {
    $('.loader').css('display', 'flex');
    //$('#usertable').remove();
    //$("#usertable tbody").empty();
    $('#usertable').find("tr:gt(0)").remove();

    $.ajax({
        url: "../WebService.asmx/getAllBatchusers",
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        data: "{'utype': '" + $('#selectUser').val() + "'}",
        success: function (response) {
          //  alert(response.d);
            user = JSON.parse(JSON.parse(response.d));

            if (user[0].ustatus.localeCompare("521") === 0) {
                $('.loader').css('display', 'none');
                alert("No records found");
            }
            else if (user[0].ustatus.localeCompare("522") === 0)
                alert("Something went wrong. Please try again.");
            else {

                for (i = 0; i < user.length; i++) {
                    var txt = '<tr><th scope="row">' + (parseInt(i) + 1) + '</th>';
                    txt += '<td>' + user[i].fname + '</td>';
                    txt += '<td>' + user[i].sname + '</td>';
                    txt += '<td>' + user[i].batchno + '</td>';
                    txt += '<td>' + user[i].uphno + '</td>';
                    txt += '<td>' + user[i].uemail + '</td>';
                    switch (parseInt(user[i].ustatus)) {
                        case -2:
                            txt += '<td><div class="pending">Pending </div> </td>';
                            txt += '<td> <div class="pending"> Pending </div></td>';
                            break;
                        case -1:
                            txt += '<td><div class="approved">Approved </div> </td>';
                            txt += '<td> <div class="pending"> Pending </div></td>';
                            break;
                        case 1:
                            txt += '<td><div class="approved">Approved </div> </td>';
                            txt += '<td> <div class="approved"> Approved </div></td>';
                            break;
                        case 0:
                            txt += '<td><div class="blocked">Blocked</div> </td>';
                            txt += '<td> <div class="blocked"> Blocked </div></td>';
                            break;
                    }
                    //alert(user[i].uid);
                    txt += '<th><p><a class="link-info link-opacity-50-hover" id="editUser" href="editusers.html?e=' + user[i].uid + '"> Edit </a></p></th>';
                    $('#usertable tr:last').after(txt);
                }
                $('.loader').css('display', 'none');
                //j = i;
            }

        }

    }).done(function () {


    }).fail(function (XMLHttpRequest, status, error) {
        console.log("Status " + status + "Error" + error);
    });
    

    //Edit user data and getting data using button 




}
