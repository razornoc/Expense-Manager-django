const searchField=document.querySelector('#searchField')
const searchFieldIncome=document.querySelector('#searchFieldIncome')
const tableOutput=document.querySelector('.table-output')
const appTable=document.querySelector('.app-table')
const tbody=document.querySelector('.table-body')
tableOutput.style.display="none"

searchField.addEventListener('keyup',(e)=>{
    const searchValue=e.target.value
    if(searchValue.length>0){
      tbody.innerHTML=""
        fetch('/search-expenses/', {
            body: JSON.stringify({ searchText: searchValue }),
            method: 'POST',
          })
            .then((res) => res.json())
            .then((data) => {
             console.log("data",data)
             appTable.style.display="none"
              tableOutput.style.display="block"
             if(data.length===0){
              tableOutput.innerHTML="no results"
             }
             else{
              data.forEach(item => {
                tbody.innerHTML+=`
                  <tr>
                  <td>${item.amount}</td>
                  <td>${item.category}</td>
                  <td>${item.description}</td>
                  <td>${item.date}</td>
                  </tr>
                `
              });
              
            }
            })
    }
    else{
       appTable.style.display="block"
       tableOutput.style.display="none"
    }
})

// searchFieldIncome.addEventListener('keyup',(e)=>{
//   const searchValue=e.target.value
//   console.log(searchValue)
//   if(searchValue.length>0){
//     tbody.innerHTML=""
//       fetch('/search-income/', {
//           body: JSON.stringify({ searchText: searchValue }),
//           method: 'POST',
//         })
//           .then((res) => res.json())
//           .then((data) => {
//            console.log("data",data)
//            appTable.style.display="none"
//             tableOutput.style.display="block"
//            if(data.length===0){
//             tableOutput.innerHTML="no results"
//            }
//            else{
//             data.forEach(item => {
//               tbody.innerHTML+=`
//                 <tr>
//                 <td>${item.amount}</td>
//                 <td>${item.source}</td>
//                 <td>${item.description}</td>
//                 <td>${item.date}</td>
//                 </tr>
//               `
//             });
            
//           }
//           })
//   }
//   else{
//      appTable.style.display="block"
//      tableOutput.style.display="none"
//   }
// })