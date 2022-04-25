let onClick = function(){
    let fname = document.querySelector('#fname').value

    let lname = document.querySelector('#lname').value

    let collegeName = document.querySelector("input[id='collegeName']").value

    let depName = document.querySelector('input[id="depName"]').value

    let events = [...document.querySelectorAll('input[name="events"]:checked')]
    events = events.map(x => x.value)
    events = events.join(', ')


    fetch('http://localhost:5000/insert', {
        headers: {'Content-type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            "fn": fname,
            "ln": lname,
            "cn": collegeName,
            "dn": depName,
            "eves": events
        })
    })
    .then(response => response.json)
    .then(data => insertRow(data['data']))

}

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => displayTable(data['data']))
})

function displayTable(data){
    const table = document.querySelector("table tbody")
    
    if(data.length == 0){
        table.innerHTML = "<tr><td class = 'no-data' colspan='8'>No Data</td></tr>"
        return
    }

    let tableHtml = ""

    for(let d of data){
        tableHtml += "</tr>";
        for(let key in d){
            if(key == 'Date'){
                d[key] = new Date(d[key]).toLocaleString()
            }
    
            tableHtml += `<td>${d[key]}</td>`
        }
        tableHtml += `<td><button class="delete-row-btn" data-id=${d.ID}>X</td>`;
        tableHtml += "</tr>";
    }
    
    table.innerHTML = tableHtml

}

function insertRow(data){
    const table = document.querySelector("table tbody")
    const isNoData = document.querySelector(".no-data")

    let tableHtml = ""

    tableHtml += "<tr>"

    for(let key in data){
        if(key == 'Date'){
            data[key] = new Date(data[key]).toLocaleString()
        }

        tableHtml += `<td>${data[key]}</td>`
    }

    tableHtml += "<tr>"
    
    if (isNoData){
        table.innerHTML = tableHtml
    } else{
        const newRow = table.insertRow()
        newRow.innerHTML = tableHtml
    }
    

}