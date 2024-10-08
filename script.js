function loadTodos(){
    // this function will load some todos in the browser

    // const todos=JSON.parse(localStorage.getItem("todos")) || {};    
    // console.log(todos);
    // return todos;

    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    console.log(todos);
    return todos;
}


//Lets write todos in the local storages

function writeTodo(todoText){
    const todos=loadTodos();
    todos.push(todoText);
    localStorage.setItem("todos",todos);

}


document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput");
    const addTodoBtn = document.getElementById("addTodo");

    addTodoBtn.addEventListener("click", (e) => {
        const todoText = todoInput.value;
        if (todoText == '') {
            alert("Please enter some value");
        } else {
            writeTodo(todoText);
            todoInput.value = ''; // Clear the input after adding
        }
    });
}); 

// Lets add an EVenListner then whenever page opens and dom tree is created then that event triggers

// this is an asynchronous task so it will be a callback


// document.addEventListener("DOMContentLoaded",()=>{



//     // suppose you want to fire an event when you write something and hover out of focous
//     //  we use change event for that


    
//     // when you click out of focous after writing something it will trigger.
    
//     // todoInput.addEventListener("change",()=>{
//         //     console.log(`Somethig has been changed`);
//         // })
        
//         //Lets we want to fire an event if someone writing something in input
        
//         // todoInput.addEventListener("input",()=>{
//             //     console.log(`Kutch likha gyaa hai abhi `);
//             // })
            
            
//             //Lets get the value of something wriiten in input box 
            
//             //2 ways   // 1 . using . value
            
//             // todoInput.addEventListener("change",()=>{
//                 //     console.log(`Somethig has been changed`,todoInput.value);
//             // })
            
            
//             // using a callback pass event and event.target.val
            
//             // todoInput.addEventListener("change",(event)=>{
//                 //     console.log(`Something chnaged`,event.target.value);
//                 // })
                
//                 //Lets trim  this todo value text
                
//                 // todoInput.addEventListener("change",(event)=>{
//                     //     todoText=event.target.value;
//                     //     console.log(todoText.trim());
                    
//                     // });
                    
//                     //Now i want whatever i write that gets save in my local storage
                    
//      const todoInput=document.getElementById("todoInput");
//      const addTodobtn=document.getElementById("addTodo");

//     addTodobtn.addEventListener("click",(e)=>{
//         const todoText=todoInput.value;
//         if(todoText ==''){
//             alert("Please Enter some value");
//         }else{
//             writeTodo(todoText);
//         }

//     });

//     })


// console.log(`Hello`);
