$(document).ready(pageLoad);

function pageLoad(){
    console.log('start to do');
    getTasks();
    $('#add').on('click', addTask);
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
                var $taskP = $('<div>' + res[i].task + ' ' + res[i].done + '</div>');
                var $delete = $('<button class="delete">Delete</button>');
                var $update = $('<button class="done">Done</button>');
                $($taskP).append($update)
                $($taskP).append($delete);
                $('#tasks').append($taskP);
            }//end for loop
        } //end success function
    }) //end ajax call
} //end getTasks

function addTask() {
    console.log('add button clicked');
}

function doneTask() {
    console.log('done button clicked');
}

function deleteTask() {
    console.log('delete button clicked');
    // $.ajax( {
    //     type:   'DELETE',
    //     url:    '/tasks',
    //     success:    
    // })
}