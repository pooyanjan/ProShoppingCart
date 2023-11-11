/*const products = [
    {id:1, title: 'guitar1', price:2000, },
    {id:2, title: 'guitar2', price:1000, },
    {id:3, title: 'guitar3', price:800,  },
]*/
/* Variables */
const addBtn = document.querySelectorAll('.addBtn')
const CartItems = document.querySelector('.CartItems')


/* Event */ 
if(addBtn) addBtn.forEach(addBtn => {
    addBtn.addEventListener('click', addToCart);
});

if(CartItems) CartItems.addEventListener('click', removeToCart);
    


/* Functions */
//اضافه شدن به سبد
function addToCart(e) {
 const title = document.querySelector('title')
 const id = Math.floor( Math.random() * Date.now() ).toString(36);
 CartItems.innerHTML += SetToDoElement(title, id); 
 addtodofromlocalstorage(title, id)
 Swal.fire({
    position: "center",
    icon: "success",
    title: " ...محصول به سبد خرید اضافه شد ",
    showConfirmButton: false,
    timer: 1500
  });
}


//حذف از سبد
  /*function removeToCart(e) {
    if( e.target.classList == 'remove' ){
        let status =confirm('sure?');
        if(status){
            const id = e.target.getAttribute('data-id')
            e.target.parentElement.remove();
        }
    }
   }*/
        function removeToCart(e) {
    if( e.target.classList == 'remove' ){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: " محصول از سبد خرید حذف شود؟ ",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "خیر",
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                const id = e.target.getAttribute('data-id')
               e.target.parentElement.remove();
               removetodofromlocalstorage(id);
            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
            }
          })
    }
   }
    
 //Add to local storage...
 function addtodofromlocalstorage(title, id) {
    const todolist = getFromLocalStorage();
    const list = {
    id:id,
    title:title,
   }
   todolist.push(list);
   localStorage.setItem('toDoList',JSON.stringify(todolist));
} 

//Remove from local storage...
function removetodofromlocalstorage(id) {
    const todolist = getFromLocalStorage();
    let idIndex;

    todolist.map((todo, index) => {
       if( todo.id === id ){
         idIndex = index;
         return; 
       }
    })
    todolist.splice(idIndex,1);

    localStorage.setItem('toDoList', JSON.stringify( todolist ));
} 

   //Get from local storage...
  function getFromLocalStorage() {
    const todolist = localStorage.getItem('toDoList');
    let list;
    if( todolist == null){
        list =[];
    }else{
        list = JSON.parse(todolist);
    }
    return list;
  } 
  


// load to do(ذخیره در استوریج)
function loadToDo() {
    const toDoList =getFromLocalStorage();

    toDoList.map(todo => {
        CartItems.innerHTML += SetToDoElement(todo.title);
    });
}

 
 //Set To Do Element
function SetToDoElement(title, id) {
    return `
    <div class="item">
        <button class="remove" data-id="${id}">حذف</button>
        <div class="qty"></div>
        <div class="item-title">${title}</div>
    </div>
    `;
}

  
loadToDo();