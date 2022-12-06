
const issuesOutput = document.querySelector('#issues')
const issuesCount = document.querySelector('#number')
const iframe_tag = document.querySelector('#iframeid')



fetch('/cloner/list').then(data => {
  return data.json();}).then(post => {        

    let params = (new URL(document.location)).searchParams;
    let name = params.get("clone");
    addToDOM(name)    

});




  // Add issues to DOM
const addToDOM = (issues) => {
  
    issuesOutput.innerHTML = ''
    issuesCount.innerHTML = ''
  
    if (issues.length === 0) {
      issuesOutput.innerHTML = warningMessage
    } else {      
      issuesCount.innerHTML = `
        <p class="bg-light text-center">
                <a href="/clones/${issues}">${issues}</a>                                
        </p>`
      iframe_tag.src = `/clones/${issues}`

      // issues.data.forEach((issue) => {
      //   const output = `
      //     <div class="card mb-5">
      //       <div class="card-body">            
  
      //         <p class="bg-light p-1 my-1">
      //           <a href="/clones/${issue}">${issue}</a>
      //           <iframe id="iframe-id" src="/clones/${issue}/" style="height:100vh;width:100%">   
      //         </p>
             
      //       </div>
      //     </div>
      //   `
  
      //   issuesOutput.innerHTML += output
      // })
    }
  }

  // const checkElement = async selector => {
  //   while ( document.querySelector(selector) === null) {
  //       await new Promise( resolve =>  requestAnimationFrame(resolve) )
  //   }
  //   return document.querySelector(selector); 
  //   };                  
  
  // checkElement('#iframeid').then((selector) => {
  //   document.getElementById('iframeid').addEventListener('load', function(e) {
  //     // console.log("okayyy")
  //     // console.log("clickkkedddpos", e.target)
  //     // e.target.innerHTML = "doneee"
      
  // });
  // })
        
   

  document.querySelector('#saveiframe').addEventListener('click', function(){    
    document.querySelector('#saveiframe').innerHTML = "saving..."
    let params = (new URL(document.location)).searchParams;
    let name = params.get("clone");
    
    var iFrame = document.getElementById('iframeid').contentDocument;
    var elementToDelete = iFrame.querySelector('[state="active"]')    

    if(elementToDelete){
      console.log("clickkk",  elementToDelete)
      elementToDelete.classList.remove("activeElementClass");
    }
    var desiredElement = iFrame.getElementsByTagName("html")[0].outerHTML    
    // console.log("iframe element", desiredElement)
    
      fetch(`/cloner/saveiframe/`, {
        method: "POST",
        body: JSON.stringify({"iframeContent": desiredElement, "name": name}),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      })
      .then(res => res.json())
      .then(json => console.log(json))
      // .catch(err => console.log(err))
      console.log("doonnnee")      
      document.querySelector('#saveiframe').innerHTML = "Saved successfully..."
      setTimeout(function(){document.querySelector('#saveiframe').innerHTML = "Save page"}, 2000);
      
});