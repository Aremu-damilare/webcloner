
const cloneList = document.querySelector('#issues')
// const issuesCount = document.querySelector('#number')


fetch('/cloner/list')
  .then(data => {
    return data.json();
  })
.then(post => {
    // console.log(post);
  addToDOM(post)            
});


  // Add issues to DOM
const addToDOM = (issues) => {
  
    cloneList.innerHTML = ''
    // issuesCount.innerHTML = ''
  
    if (issues.length === 0) {
      cloneList.innerHTML = warningMessage
    } else {
      // issuesCount.innerHTML = `
      //    <p class="alert alert-warning"> clones !</p>
      // 
      // `
      issues.data.forEach((issue) => {
        const output = `        
        <li class="list-group-item d-flex justify-content-between align-content-center">
  
        <div class="d-flex flex-row">
          <img src="https://img.icons8.com/color/100/000000/folder-invoices.png" width="40" />
          <div class="ml-2">
            <h6 class="mb-0"> <a href="/cloner/clonedetail?clone=${issue}">${issue}</a> <hr></h6>            
            <div class="about">
              <span  onclick="folderDelete(this)" class="folder-delete-button" data=${issue} style="color:red" > Delete </span>
              <span><a href="https://${issue}.webcloner.net">webcloner.net</a></span>
            </div>
          </div>
        </div>
        <div class="check">                    
        </div>

      </li>                       
                  `
  
        cloneList.innerHTML += output
      })
    }
  }

  function folderDelete(e){
    var deleteFolderBtn = document.querySelectorAll(".folder-delete-button");
    
    var targ;
    if (!e) var e = window.event;
    if (e.target) targ = e.target;  
    
    let text = "You are about to delete a Folder?";
    if (confirm(text) == true) {
      var folderName = e.getAttribute("data");

      fetch('/cloner/delete?folder='+folderName)
        .then(data => {
          return data.json();
        })
      .then(post => {
        // console.log(post)
          document.querySelector("#delete-notif").innerHTML = `<span class="alert alert-primary" role="alert">${JSON.stringify(post.message)}</span>`
      });
      setTimeout(function(){location.reload()}, 1000);
    } else {
      document.querySelector("#delete-notif").innerHTML = `<span class="alert alert-primary" role="alert"> Aborted </span>`
    }
    // for(i=0;i<deleteFolderBtn.length;i++){             
    //   deleteFolderBtn[i].addEventListener("click", function(e){
    //     console.log("7666666666666666666666")
            
      
    // })
    // }
  }
