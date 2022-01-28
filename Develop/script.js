// Setting the date and putting it into the webpage
var setDate = moment().format("dddd, MMMM Do");
$("#currentDay").append(setDate);
var tableBody = $(".table").children().eq(1);
var assignedTasks = [];
assignedTasks.length = 25;
// Creates and Renders Schedule Planner
function setScheduler(){
    var j = 1;
    for(var i = 7; i < 25; i++){
        var tableRow = $("<tr></tr>");
        if(i > 12){
        var hours = $("<td></td>").text(j + ":00 pm" );
        var isPast = moment(i, "hh pm").isBefore(moment());
        var sameHr = moment().isBetween(moment(i, "hh pm"), moment(i + 1, "hh pm"));
        if(isPast && sameHr){
                tableRow.addClass("table-warning");
        }
        else if(isPast){
            tableRow.addClass("table-danger");
        }
        else{
            tableRow.addClass("table-success");
        }
        j++;
        }
        else {
        var hours = $("<td></td>").text(i + ":00 am" );
        var isPast = moment(i, "hh am").isBefore(moment());
        var sameHr = moment().isBetween(moment(i, "hh am"), moment(i + 1, "hh am"));
        if(isPast && sameHr){
            tableRow.addClass("table-warning");
            }
        else if(isPast){
            tableRow.addClass("table-danger");
        }
        else{
            tableRow.addClass("table-success");
        }
        }
        var tasks = $("<td></td>");
        var pin = $("<td></td").attr("style", "border-left: 1px solid black;");
        var writeTask = $("<textarea></textarea>").val(assignedTasks[i]);
        var saveBtn = $("<button>Save</button>").addClass("btn" + i);
   

        initText(saveBtn, writeTask, i)
        tableRow.append(hours);
        tasks.append(writeTask);
        pin.append(saveBtn);
        tableRow.append(tasks);
        tableRow.append(pin);
        tableBody.append(tableRow);
        }
    }
// assigns value to the specified index of the assignedTasks array
// upon the clicking of the savebtn
function initText(saveBtn, writeTask, i){
    saveBtn.on("click", function(){
        saveBtn.text("Saved")
        saveBtn.attr("style", "background-color: gray;")
        assignedTasks[i] = writeTask.val()
        storingTasks();
        })
    
    } 
// Stores assignedTasks data to the localstorage
function storingTasks(){
    localStorage.setItem("assignedTasks",JSON.stringify(assignedTasks));
}

// Updates assignedTasks
function init(){
    var storeTasks = JSON.parse(localStorage.getItem("assignedTasks"));
    if(storeTasks !== null)    
        assignedTasks = storeTasks;
   
    setScheduler()
}

init()