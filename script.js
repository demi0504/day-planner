$(document).ready(function(){
    //Display current date
    const currentDate = moment().format("MMM Do YYYY");
    let $dateHeading = $('#currentDay');
    $dateHeading.text(currentDate);

    //Array of time
    var workHours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM"];
    var todosArray = [];

    init();

    //Build time blocks for work hours 
    function renderTimeBlocks() {
        for (var i = 9; i <= 17; i++){
            let index = i - 9;
            let timeBlock = $("<div></div>").addClass("time-block row");
            let timeArea = $("<div></div>").addClass("hour col-2").text(workHours[index]);
            let textArea = $("<textarea></textarea").addClass("input" + index + " description col-9").text("");
            let button = $("<button></button>").addClass("saveBtn col-1").attr("data-btnIndex", index);
            let saveIcon = $("<i></i>").addClass("fas fa-save fa-2x");
            $("#planner-container").append(timeBlock);
            timeBlock.append(timeArea, textArea, button);
            button.append(saveIcon);

            //Adjust color of time blocks
            setRowColor(textArea, i);

            textArea.text(todosArray[index]);
        }
    }
    
    //Function to set the color of time blocks
    function setRowColor(row, hour) {
        if(hour < parseInt(moment().format('H'))){
            row.addClass("past");
        } else if(hour > parseInt(moment().format('H'))){
            row.addClass("future");
        }else {
            row.addClass("present");
        }
    }
   
    //Get todos from local storage
    function init() {
        var storedTodos = JSON.parse(localStorage.getItem("todos"));

        if (storedTodos !== null) {
            todosArray = storedTodos;
        } else{
            todosArray = new Array();
            storeTodos();
        }

        renderTimeBlocks();
    }

    //Define store todos
    function storeTodos(){
        localStorage.setItem("todos", JSON.stringify(todosArray));
    }

    //Save button function
    $(".saveBtn").on("click",function(event){
        event.preventDefault(); 
        let index = $(this).attr("data-btnIndex");  
        let todoText = $(".input"+index).val();

        // Add new todoText to todos array
        todosArray[index] = todoText;
        console.log(todosArray);
        
        // Store updated todos in localStorage
        storeTodos();

    });
})


