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
            $('#tasks').empty();
            for (var i=0; i < res.length; i++) {
                var $taskP = $('<div>' + res[i].task + ' ' + res[i].done + '</div>').data('id', res[i].id);
                console.log(res[i].task);
                var $delete = $('<button class="delete">Delete</button>');
                var $update = $('<button class="done">Done</button>');
                $($taskP).append($update)
                $($taskP).append($delete);
                $('#tasks').append($taskP);
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
        }   //end success function
    });//end ajax POST
} //end addTask function

function doneTask() {
    console.log('done button clicked');
    //$.ajax()
}

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