
function getLymphs(){
    console.log('getLymphs');
  
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://localhost:3003/clp', false); // false for synchronous request
    xmlHttp.send(null);
  
    var lymphs = JSON.parse(xmlHttp.responseText)
    console.log(lymphs);
  
    const htmlString = lymphs
      .map((lymph) => {
        return `
              <li class="lymphs">
                  <h2>Name: ${lymph.cell_name}</h2>
                  <p>CDs: ${lymph.cd}<br>
                  diameter: ${lymph.diameter}<br>
                  Father cell: ${lymph.father_cell}
                  </p>
                  <img src="images/mono.png"></img>               
              </li>
          `;
      })
      .join('');
  
    var mydiv = document.getElementById("lymphs-list");
    mydiv.innerHTML += htmlString;
  
    return xmlHttp.responseText;
  }
  