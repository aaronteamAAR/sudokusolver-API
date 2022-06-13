
const puz = document.querySelector('#puzzle')
const button = document.querySelector('#solvebutton')
let submission = []

const sq = 81

for (let i = 0; i < sq; i++){
   const inputElement = document.createElement('input')
    inputElement.setAttribute('type', 'number')
    inputElement.setAttribute('min', 1)
    inputElement.setAttribute('max', 9)
    if(
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2)  && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8)  && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5)  && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2)  && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8)  && i > 53) 
    ){
        inputElement.classList.add('add-section')
    }
    puz.appendChild(inputElement)
}

function joinVal(){
    const inputs =  document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value){
            submission.push(input.value)
        }else {
            submission.push('.')
        }
    }

    )
    console.log(submission) 
    console.log(joinVal)
}
const  populateValues = (isSolvable, solution) => {
      const inputs = document.querySelectorAll('input')
      if(isSolvable && solution){

      inputs.forEach((input, i) => {
               input.value = solution[i]
      }) 
    }
}

const solve = () => {
    joinVal()
  const data  = {numbers: submission.join('')}
  console.log('data', data)


  fetch('http://localhost:8080/solve',{
      method: 'POST',
      headers:{
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify(data)

  }) .then(response => response.json())
  .then(data => {
      console.log(data)
      populateValues(data.solvable, data.solution)
      submission = []
  })
  .catch((error) => {
      console.error('Error:', error)
  })
}

button.addEventListener('click', solve)

