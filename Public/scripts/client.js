$(document).ready(pageLoad);

function pageLoad(){
    console.log('start to do');
    getTasks();
    $('#addTask').on('click', addTask);
    $('#tasks').on('click', '.done', doneTask);
    $('#tasks').on('click', '.delete', deleteTask);
}

function getTasks() {
    $.ajax( {
        type:   'GET',
        url:    '/tasks',
        success: function(res) {
            console.log('in for loop');
            $('#incomplete').empty();
            $('#complete').empty();
            for (var i=0; i < res.length; i++) {
                var $taskP = $('<div>' + res[i].task + '</div>').data('id', res[i].id).css('padding', '10px');
                var $delete = $('<button class="delete">Delete</button>').css('background-color', '#765285');
                var $update = $('<button>Done</button>').css('background-color', '#765285');
                $($taskP).append($update)
                $($taskP).append($delete);
                if (res[i].done === false)  {
                    $('#incomplete').append($taskP);
                } else {
                    $($taskP).css('text-decoration', 'line-through'); 
                    $('#complete').append($taskP);   
                }; //end if/else
            }//end for loop
        } //end success function
    }); //end ajax call
} //end getTasks

function addTask() {
    console.log('add button clicked');
    var taskToAdd = {
        task: $('#task').val()
    } //input object
    console.log('Task added -->', taskToAdd)
    $.ajax({
        type:   'POST',
        url:    '/tasks',
        data:   taskToAdd,
        success:    function(res){
            console.log('task added to DB');
        getTasks();
        $('#task').val('')
        }   //end success function
    });//end ajax POST
} //end addTask function

function doneTask() {
    var thisId = $(this).parent().data('id');
    console.log('done button clicked');
    $.ajax( {
        type:   'PUT',
        url:    '/tasks/' + thisId,
        success: function(res) {
            console.log('server resp:', res);
            getTasks();
        }//end success function
     });//end ajax PUT
}//end doneTask function

function deleteTask() {
    var thisId = $(this).parent().data('id');
    console.log('delete button clicked', thisId);
    $.ajax( {
        type:   'DELETE',
        url:    '/tasks/' + thisId,
        success:    function(res) {
            console.log('server resp:', res);
            getTasks();
        } //end success function
     });//end ajax DELETE
}// end deleteTask function

