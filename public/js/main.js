const output = document.querySelector('#issues')
// const issuesCount = document.querySelector('#number')
const alertMessage= '<div class="alert alert-danger" role="alert">Something went wrong</div>'
const emptyUrl= '<div class="alert alert-danger" role="alert">Please add an URL</div>'
// const warningMessage= '<div class="alert alert-warning" role="alert">no Issues Found</div>'
// const CsvMessage= '<div class="alert alert-warning" role="alert">CSV not available</div>'
// import Scrape  from 'website-scraper';

const startCloning = async (e) => {
  e.preventDefault()
  const url = document.querySelector('#url').value
  const name = document.querySelector('#name').value
  if (url === '') {
    // output.innerHTML = emptyUrl
  } else { 
    setLoading()    

  // fetch('https://webcloner.net/subdomain_api/domain/addsub.php', {
  //     method: 'POST',
  //     mode:'no-cors',
  //     headers: {
  //         'Accept': 'application/json',
  //         'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({"dir": "/public_html/clones/"+name, "domain": name}),
  // })
  // .then(response => response.json())
  // .then(response => console.log(JSON.stringify(response)))
  var subDomainCheck

  const response_ = await fetch("https://webcloner.net/subdomain_api/domain/addsub.php", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"dir": "/public_html/clones/"+name, "domain": name}),
    });
    
    response_.json().then(data => {
      console.log("status",data);
      subDomainCheck = data
    });

    console.log("33333333", response_)

    if( response_.status === 406){

      console.log("errrororo subdomain")
      addToDOM("Error: Name not available. ")
      setLoading(false) 
      
    } else if( response_.status === 200 ) {
      addToDOM("Subdomain is available.... creating website.....")
      console.log("availableee subdomain.... creating website.....")
      const response = await fetch(`/cloner/start?url=${url}&name=${name}`);    

      if (response.status === 200) {      
        console.log("cratesubdoamin", response_)
        const { successResponse } = await response.json()
        addToDOMSuccess(name)
        console.log("ccc",name)
        setLoading(false)                  
      }
      if (response.status === 404) {      
        addToDOM("Error")
        setLoading(false)                  
      } 
  
      if (response.status === 400) {      
        addToDOM("URL is Required")
        setLoading(false)                  
      } 
  
      if (response.status === 403) {      
        addToDOM("Folder already exists!")
        setLoading(false)                  
      } 
      else {
        console.log("endd")
      }
    }
    

  }
}

// Add issues to DOM
const addToDOMSuccess = (content) => {
  setLoading(false)       
  output.innerHTML = `<span class="alert alert-primary" role="alert"> Your website <a href="/cloner/clonedetail?clone=${content}"> ${content} </a> is ready. </span>`
}

const addToDOM = (content) => {    
  output.innerHTML = `<br><span class="alert alert-primary" role="alert"> ${content} </span><br>`
}

// Set loading state
const setLoading = (isLoading = true) => {
  const loader = document.querySelector('.loader')
  if (isLoading) {
    loader.style.display = 'block'
    output.innerHTML = ''
  } else {
    loader.style.display = 'none'
  }
}

// Escape HTML
function escapeHTML(html) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

document.querySelector('#form').addEventListener('submit', startCloning)
// document.querySelector('#clearResults').addEventListener('click', clearResults)
// document.querySelector('#csvBtn').addEventListener('click', csvIssues)

// document.querySelector('#iframebtn').addEventListener('click', addBtn)