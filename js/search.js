/******************************************/
/***********SEARCH BAR FUNCTIONS***********/
/******************************************/


const ResultsList = document.getElementById('results-list');
const searchBar = document.getElementById('searchBar');
let cells; //array of objects that gets returned after wait

console.log('searchBar');

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase(); //Set var to grab user input & convert the string to lowerCase 

  const filtered = cells.filter((cell)=> {
    return (cell.cell_name.toLowerCase().includes(searchString) ||
      cell.father_cell.toLowerCase().includes(searchString)||
      cell.cd.toLowerCase().includes(searchString)
  );
  });

  displayResults(filtered);
});

const loadResults = async () => {
  try {
    const res = await fetch('http://localhost:3003/all');
    cells = await res.json();
    displayResults(cells);
    } catch (err) {
    console.error(err);
  }
};


const displayResults = (cells)=> { //display json objects as a list in html
  const htmlString = cells
    .map((cell) => {
      return `
      <li class="cells">
      <h2> Name: ${cell.cell_name}</h2>
      <p>CDs: ${cell.cd}<br>      
      Father cell: ${cell.father_cell}<br>      
      </p>
      <img src="images/plts.png"></img>  
        </li>
        `;
    })
    .join('');

  ResultsList.innerHTML = htmlString;
};

loadResults();


