const form = document.querySelector('form.section-2')
const input = form.querySelector('input')
const sectionResult = document.querySelector('.search-result-block')
let cop = document.querySelector('.hidden-result')


// const links = getLocalLinks()
// addResult(links)
console.log('hello');

form.addEventListener('submit', async (e)=>{
  //prevent form from submitting
  e.preventDefault();
  let data = {
    urlInput: document.querySelector('.url-input').value
    }
    
    let response = await fetch('/', {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(data)
    })
    const link = await response.json();
    console.log(link)
    // retrieve previous data from local storage
    let links;
    links = localStorage.getItem('generated-links');
    links = JSON.parse(links) || []
    
    links.push(link)
    // store links in local storage
    localStorage.setItem('generated-links', JSON.stringify(links))
    fetchUrls();
  })
  
  let Mynewurl = document.querySelector(".hidden-result");
  function fetchUrls() {
    Mynewurl.innerHTML = "";
    let links = localStorage.getItem("generated-links");
    let linkObject = JSON.parse(links) || [];
    linkObject.forEach(link => {
      let Urlcontainer = `
      <div class="link__item">
      <span class="original__link">${link.originalURL}</span>
      <span class="short__link">${link.shortURL}</span>
      <button class="copy-btn">Copy</button>
      </div>
      `;
      Mynewurl.innerHTML += Urlcontainer;
    });
  }
  fetchUrls()

  cop.addEventListener('click', (e)=>{
    if (e.target.classList.contains('copy-btn')){
      navigator.clipboard.writeText(e.target.previousElementSibling.textContent)
      .then(
        ()=>{
          console.log('copied to clipboard');
        },
        ()=>{
          console.log('error');
        }
      );
      e.target.textContent = 'copied!';
    }
  });



// let data = await response.json();
//   //   retrieve data from localstorage
//   let urls = JSON.parse(localStorage.getItem("data")) || [];

//   // update urls with server's data
//   urls.push(data);
//   //   store data in local storage.
//   localStorage.setItem("data", JSON.stringify(urls));
//   console.log(urls);
//   fetchUrls();
// });


// function addResult(links){
//     function generateTemplat(_link){
//        const hiddenResult = document.createElement('div')
//        const insertedLink = document.createElement('p')
//        const horizontalRule = document.createElement('hr')
//        const results = document.createElement('div')
//        const shortCode = document.createElement('p')
//        const copyButton = document.createElement('button')

//        hiddenResult.className = 'hidden-result'
//        insertedLink.className = 'original__link'
//       //  horizontalRule.className = 'result-block-hr'
//        results.className = 'link__item'
//        shortCode.className = 'short__link'
//        copyButton.className = 'copy-btn'

//        insertedLink.innerText = _link.originalURL
//        shortCode.innerText = _link.shortURL
//         copyButton.innerText = 'Copy'
        
//        copyButton.addEventListener('click', ()=>{
//         navigator.clipboard.writeText(_link.shortURL).then(()=>{
//           alert('Link has be copied to your clipboard!')  
//         })
//        })

//        shortCode.appendChild(copyButton)
//        results.appendChild(shortCode)
//        hiddenResult.append(insertedLink, horizontalRule, results)
//        return hiddenResult
//     }

//     const templateResultsStore = []

//     links.forEach((link)=>{
//         templateResultsStore.push(generateTemplat(link))
//     })

//     sectionResult.innerHTML = null
//     sectionResult.append(...templateResultsStore)
// }