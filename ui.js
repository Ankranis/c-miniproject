let selected = [];

let booked = {
1: [],
2: [],
3: []
};

function showBook()
{

document.getElementById("ui").innerHTML = `

Name <input id=name><br><br>

Route
<select id=route onchange="makeGrid()">
<option value=1>1</option>
<option value=2>2</option>
<option value=3>3</option>
</select>

<div class=bus id=grid></div>

<br>
<button onclick="confirmBook()">Confirm</button>

`;

makeGrid();

}


function makeGrid()
{

selected = [];

let route =
parseInt(
document.getElementById("route").value
);

let g =
document.getElementById("grid");

g.innerHTML = "";

for(let i=1;i<=20;i++)
{

let d =
document.createElement("div");

d.className = "seat";

d.innerText = i;


/* already booked */

if(
booked[route].includes(i)
)
{
d.style.background = "gray";
}


/* click */

d.onclick = function()
{

if(
booked[route].includes(i)
)
return;


/* remove */

if(
d.classList.contains("selected")
)
{
d.classList.remove("selected");

selected =
selected.filter(
x => x != i
);
}

/* add */

else
{
d.classList.add("selected");

d.style.background = "yellow";

selected.push(i);
}

};


g.appendChild(d);

}

}



function confirmBook()
{

if(typeof Module==="undefined")
{
alert("WASM not ready");
return;
}

let name =
document.getElementById("name").value;

let route =
parseInt(
document.getElementById("route").value
);

for(let s of selected)
{

Module.ccall(
"book",
null,
["number","number","string"],
[route-1,s,name]
);

/* store booked */

booked[route].push(s);

}

alert("Booking confirmed");

makeGrid();

}



function cancel()
{

let id =
prompt("Ticket ID");

Module.ccall(
"cancelTicket",
null,
["number"],
[id]
);

}



function search()
{

let id =
prompt("Ticket ID");

Module.ccall(
"searchTicket",
null,
["number"],
[id]
);

}



function report()
{

Module.ccall(
"report",
null,
[],
[]
);

}