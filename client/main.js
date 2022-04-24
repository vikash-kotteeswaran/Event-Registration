let onClick = function(){
    let fname = document.querySelector('#fname').value

    let lname = document.querySelector('#lname').value

    let collegeName = document.querySelector("input[id='collegeName']").value

    let depName = document.querySelector('input[id="depName"]').value

    let events = [...document.querySelectorAll('input[name="events"]:checked')]
    events = events.map(x => x.value)

    let user = {
        "First Name": fname,
        "Last Name": lname,
        "College Name": collegeName,
        "Dep Name": depName,
        "Events": events
    }

}