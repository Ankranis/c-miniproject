let selected = [];

let booked = {
1: new Set(),
2: new Set(),
3: new Set()
};

function showBook()
{

document.getElementById("ui").innerHTML =

`
Name:
<input id="name">

<br><br>

Route:

<select id="route" onchange="makeGrid()">
<option value="1">1</option>
<option value="2">2</option>
<option value="3">3</option>
</select>

<div id="grid"></div>

<br>

<button onclick="confirmBook()">Confirm</button>
`;

makeGrid();

}



function makeGrid()
{

let route =
parseInt(
document.getElementById("route").value
);

let g = "";

g += "<div class='bus'>";

for(let i=1;i<=20;i++)
{

let cls = "seat";

if(selected.includes(i))
cls += " selected";

if(booked[route].has(i))
cls += " booked";


g +=
`<div class="${cls}"
onclick="pick(${i})">
${i}
</div>`;

if(i%2==0)
g += "<div></div>";

}

g += "</div>";

document.getElementById("grid").innerHTML = g;

}



function pick(n)
{

let route =
parseInt(
document.getElementById("route").value
);

if(booked[route].has(n))
return;

if(selected.includes(n))
{
selected =
selected.filter(x=>x!=n);
}
else
{
selected.push(n);
}

makeGrid();

}



function confirmBook()
{

let name =
document.getElementById("name").value;

let route =
parseInt(
document.getElementById("route").value
);

document.getElementById("ui").innerHTML="";

for(let s of selected)
{

Module.ccall(
"book",
null,
["number","number","string"],
[route-1,s,name]
);

booked[route].add(s);

}

selected=[];

makeGrid();

}



function cancel()
{

let id = prompt("Ticket ID");

document.getElementById("ui").innerHTML="";

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

document.getElementById("ui").innerHTML="";

Module.ccall(
"searchTicket",
null,
["number"],
[id]
);

}



function report()
{

document.getElementById("ui").innerHTML="";

Module.ccall(
"report",
null,
[],
[]
);

}