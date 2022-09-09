window.onload = function() {
    createForm();
    getContactList();
}

var mode = 0;

createForm = () => {
	let anchor = document.getElementById("anchor");
	let form = document.createElement("form");
	form.setAttribute("id","form");
	
	//first name input
	let firstnameinput = document.createElement("input");
	firstnameinput.setAttribute("type","text");
	firstnameinput.setAttribute("id","firstnameinput");
	firstnameinput.setAttribute("name","firstnameinput");
	let firstnamelabel = document.createElement("label");
	firstnamelabel.setAttribute("for","firstnameinput");
	let firstnametext = document.createTextNode("First Name");
	firstnamelabel.appendChild(firstnametext);
	
	//last name input
	let lastnameinput = document.createElement("input");
	lastnameinput.setAttribute("type","text");
	lastnameinput.setAttribute("id","lastnameinput");
	lastnameinput.setAttribute("name","lastnameinput");
	let lastnamelabel = document.createElement("label");
	lastnamelabel.setAttribute("for","lastnameinput");
	let lastnametext = document.createTextNode("Last Name");
	lastnamelabel.appendChild(lastnametext);
	
	//email input
	let emailinput = document.createElement("input");
	emailinput.setAttribute("type","email");
	emailinput.setAttribute("id","emailinput");
	emailinput.setAttribute("name","emailinput");
	let emaillabel = document.createElement("label");
	emaillabel.setAttribute("for","emailinput");
	let emailtext = document.createTextNode("Email");
	emaillabel.appendChild(emailtext);	

	//phone input
	let phoneinput = document.createElement("input");
	phoneinput.setAttribute("type","tel");
	phoneinput.setAttribute("id","phoneinput");
	phoneinput.setAttribute("name","phoneinput");
	let phonelabel = document.createElement("label");
	phonelabel.setAttribute("for","phoneinput");
	let phonetext = document.createTextNode("Phone");
	phonelabel.appendChild(phonetext);

	//submit Button
	let submitbutton = document.createElement("input");
	submitbutton.setAttribute("type","submit");
	submitbutton.setAttribute("value","Add");
	submitbutton.setAttribute("id","submitbutton");
	
	//build form
	
	let br = document.createElement("br");
	form.appendChild(firstnamelabel);
	form.appendChild(firstnameinput);
	form.appendChild(br);
	form.appendChild(lastnamelabel);
	form.appendChild(lastnameinput);
	form.appendChild(br.cloneNode());
	form.appendChild(emaillabel);
	form.appendChild(emailinput);
	form.appendChild(br.cloneNode());
	form.appendChild(phonelabel);
	form.appendChild(phoneinput);
	form.appendChild(br.cloneNode());
	form.appendChild(submitbutton);
	form.addEventListener("submit",function(event) {
		event.preventDefault();
		addContact();
	})
    anchor.appendChild(form);
}

//rest api
//mode cors = vahvistetaan että corsin alaista koodia, testi

addContact = async () => 
    {
    let firstname = document.getElementById("firstnameinput");
    let lastname = document.getElementById("lastnameinput");
    let email = document.getElementById("emailinput");
    let phone = document.getElementById("phoneinput");
    let contact = {
        "firstname": firstname.value,
        "lastname": lastname.value,
        "email": email.value,
        "phone": phone.value
    }
    let method = "POST";
    let url = "/api/contacts/";
    if(mode) {
        method = "PUT";
        url = "/api/contacts/" + mode;
        mode = 0;
        submitbutton = document.getElementById("submitbutton");
        submitbutton.value = "Add";
    }
    let request = {
        method: method,
        mode: "cors",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(contact)
    }
    let response = await fetch(url, request)
    if(response.ok) 
    {
        firstname.value="";
        lastname.value="";
        email.value="";
        phone.value="";
        getContactList();
    } 
    else 
    {
        console.log("Response with a status: ", response.status);
    }
}

getContactList = async () => 
{
    let request = 
    {
        method: "GET",
        mode: "cors",
        headers: {"Content-Type": "application/json"}
    }
    let response = await fetch("/api/contacts/", request);
    if(response.ok) {
        let data = await response.json();
        populateTable(data);
    }
    else {
        console.log("Response with a status: " + response.status);
    }
}

removeContact = async (id) => {
    let request = {
        method: "DELETE",
        mode: "cors",
        headers: {"Content-Type": "application/json"}
    }
    let response = await fetch("/api/contacts/" + id, request);
    if(response.ok) {
        getContactList();
    } else {
        console.log("Failed to remove contact: ", response.status);
    }
}
// editti "moodi", eli vaihtaa napin näkymän editiksi ja muokkaa tietoja
changeToEditMode = (contact) => {
    mode = contact.id;
    let firstname = document.getElementById("firstnameinput");
    let lastname = document.getElementById("lastnameinput");
    let email = document.getElementById("emailinput");
    let phone = document.getElementById("phoneinput");
    firstname.value = contact.firstname;
    lastname.value = contact.lastname;
    email.value = contact.email;
    phone.value = contact.phone;
    let submitbutton = document.getElementById("submitbutton");
    submitbutton.value = "Save";
    //käyttää addcontact funktiota kontaktin tietojen muokkaamista varten
} 

//create table

populateTable = (data) => {
    let anchor = document.getElementById("anchor");
    let oldTable = document.getElementById("table");
    if(oldTable) 
    {
        anchor.removeChild(oldTable);
    }
    let table = document.createElement("table");

    //table header

    let header = document.createElement("thead");
    let headerRow = document.createElement("tr");
    let firstNameHeader = document.createElement("th");
    let firstNameText = document.createTextNode("First Name");
    firstNameHeader.appendChild(firstNameText);

    let lastNameHeader = document.createElement("th");
    let lastNameText = document.createTextNode("Last Name");
    lastNameHeader.appendChild(lastNameText);

    let emailHeader = document.createElement("th");
    let emailText = document.createTextNode("Email");
    emailHeader.appendChild(emailText);

    let phoneHeader = document.createElement("th");
    let phoneText = document.createTextNode("Phone");
    phoneHeader.appendChild(phoneText);

    let removeHeader = document.createElement("th");
    let removeText = document.createTextNode("Remove");
    removeHeader.appendChild(removeText);

    let editHeader = document.createElement("th");
    let editText = document.createTextNode("Edit");
    editHeader.appendChild(editText);

    headerRow.appendChild(firstNameHeader);
    headerRow.appendChild(lastNameHeader);
    headerRow.appendChild(emailHeader);
    headerRow.appendChild(phoneHeader);
    headerRow.appendChild(removeHeader);
    headerRow.appendChild(editHeader);

    header.appendChild(headerRow);
    table.appendChild(header);

    //table body
    let tableBody = document.createElement("tbody");
    

    for(let i=0;i<data.length;i++) 
    {
        let tableRow = document.createElement("tr");
        for(x in data[i]) 
        {
            if(x === "id") 
            {
                continue;
            }
            let column = document.createElement("td");
            let info = document.createTextNode(data[i][x]);
            column.appendChild(info);
            tableRow.appendChild(column);
        }
        // remove column
        let removeColumn = document.createElement("td");
        let removeButton = document.createElement("input");
        removeButton.setAttribute("type", "button");
        removeButton.setAttribute("value", "Remove");
        removeButton.setAttribute("name", data[i].id);
        removeButton.addEventListener("click", function(event) {
            removeContact(event.target.name);
        })
        removeColumn.appendChild(removeButton);

        // edit column
        let editColumn = document.createElement("td");
        editButton = document.createElement("input");
        editButton.setAttribute("type", "button");
        editButton.setAttribute("value", "Edit");
        editButton.addEventListener("click",function(event)
        {
            changeToEditMode(data[i]);
        })
        editColumn.appendChild(editButton);
        tableRow.appendChild(removeColumn);
        tableRow.appendChild(editColumn);
        table.appendChild(tableRow);


       
    }
    table.appendChild(tableBody);
    table.setAttribute("id", "table");
    anchor.appendChild(table);
}

