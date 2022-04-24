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
    .then(data => console.log(data['data']))

}

document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => console.log(data['data']))
    // loadHTMLTable([])
})