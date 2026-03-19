let selected = [];

function showBook()
{
document.getElementById("ui").innerHTML = `

Name <input id=name><br><br>

Route
<select id=route>
<option value=0>1</option>
<option value=1>2</option>
<option value=2>3</option>
</select>

<div class=grid id=grid></div>

<br>
<button onclick="confirmBook()">Confirm</button>

`;

makeGrid();
}

function makeGrid()
{
selected = [];

let g = document.getElementById("grid");

g.innerHTML = "";

for(let i=1;i<=12;i++)
{
let d = document.createElement("div");

d.className = "seat";

d.innerText = i;

d.onclick = function()
{
if(d.classList.contains("selected"))
{
d.classList.remove("selected");
selected = selected.filter(x=>x!=i);
}
else
{
d.classList.add("selected");
selected.push(i);
}
};

g.appendChild(d);
}
}

function confirmBook()
{
if(typeof Module === "undefined")
{
alert("WASM not loaded yet");
return;
}

let name = document.getElementById("name").value;
let route = parseInt(document.getElementById("route").value);

for(let s of selected)
{
Module.ccall(
"book",
null,
["number","number","string"],
[route,s,name]
);
}

alert("Ticket booked");
}

function cancel()
{
let id = prompt("Ticket ID");

Module.ccall(
"cancelTicket",
null,
["number"],
[id]
);
}

function search()
{
let id = prompt("Ticket ID");

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