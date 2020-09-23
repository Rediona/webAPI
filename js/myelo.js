
function getMega() {
    console.log('getMega');
  
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", 'http://localhost:3003/mep', false); // false for synchronous request
    xmlHttp.send(null);
  
    var mega = JSON.parse(xmlHttp.responseText)
    console.log(mega);
  
    const htmlString = mega
      .map((mega) => {
        return `
            <li class="mega">
                <h2>Name: ${mega.cell_name}</h2>
                <p>CDs: ${mega.cd}<br>
                diameter: ${mega.diameter}<br>
                Father cell: ${mega.father_cell}
                </p>
                <img src="images/mono.png"></img>               
            </li>
          `;
      })
      .join('');
  
    var mydiv = document.getElementById("mega-list");
    mydiv.innerHTML += htmlString;
  
    return xmlHttp.responseText;
  }
  
  
function getMyelo() {
  console.log('getMyelo');

  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", 'http://localhost:3003/gmp', false); // false for synchronous request
  xmlHttp.send(null);

  var myelo = JSON.parse(xmlHttp.responseText)
  console.log(myelo);

  const htmlString = myelo
    .map((myelo) => {
      return `
              <li class="myelo">
              <h2>Name: ${myelo.cell_name}</h2>
              <p>CDs: ${myelo.cd}<br>
              diameter: ${myelo.diameter}<br>
              Father cell: ${myelo.father_cell}
              </p>
              <img src="images/mono.png"></img>               
          </li>
        `;
    })
    .join('');

  var mydiv = document.getElementById("myelo-list");
  mydiv.innerHTML += htmlString;

  return xmlHttp.responseText;
}
