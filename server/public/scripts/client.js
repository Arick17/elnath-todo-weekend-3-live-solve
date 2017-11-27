console.log('client.js is sources');

$(document).ready(function () {
    console.log('jQuery has been loaded');
    getAllTasks();
    $('#addTaskButton').on('click', addNewTask);
    });

    function getAllTasks(){
        console.log( 'in getAllTasks' );
        // ajax call to server to get List
        $.ajax({
          method: 'GET',
          url: '/tasks',
        }).then(function(response){ //this .then is a promise which is used in a syncronise code
            console.log('response', response)
            $('taskList').empty();
            response.forEach(appendToDOM);
        })
        // display on DOM with buttons that allow edit of each
      } // end getList

      function appendToDOM(taskObject){
          $('taskList').append('<li>' + taskObject.name + '</li>');
      }

      function addNewTask(){
          var newTaskName=$('newTaskName').val();
        $.ajax({
            method: 'POST',
            url: '/tasks',
            data: {
                name: newTaskName
            }
        }).then(function(response){
            console.log('response', response);
            $('#newTaskName').val('');
            getAllTasks();
        })
        }