function clearOutput()
{
document.getElementById("output").innerText="";
document.getElementById("ui").innerHTML="";
}

function clearOutput()
{
document.getElementById("output").innerText="";
}

function showBook()
{

clearOutput();

document.getElementById("ui").innerHTML=

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

let route=
parseInt(
document.getElementById("route").value
);

let g="<div class='bus'>";

for(let i=1;i<=20;i++)
{

let cls="seat";

if(booked[route].has(i))
cls+=" booked";

else if(selected.includes(i))
cls+=" selected";

g+=
`<div class="${cls}" onclick="pick(${i})">
${i}
</div>`;

}

if(i%2==0)
g+="<div></div>";

}

function pick(n)
{

let route=
parseInt(
document.getElementById("route").value
);

if(booked[route].has(n)) return;

if(selected.includes(n))
selected=selected.filter(x=>x!=n);

else
selected.push(n);

makeGrid();

}

function confirmBook()
{

clearOutput();

document.getElementById("output").innerText=text;

let name=
document.getElementById("name").value;

let route=
parseInt(
document.getElementById("route").value
);

let text="Booking Confirmed\n";
text+="Name under which ticket(s) booked :- "+name+"\n\n";
text+="Tickets information :-\n";

for(let s of selected)
{

Module.ccall(
"book",
null,
["number","number","string"],
[route-1,s,name]
);

booked[route].add(s);

text+="Seat "+s+"\n";

}

selected=[];



makeGrid();
let g="<div class='grid'>";
}

function cancel()
{

clearOutput();

let id = prompt("Enter Ticket ID");

if(!id) return;

Module.ccall(
"cancelTicket",
null,
["number"],
[id]
);

}

function report()
{

clearOutput();

Module.ccall(
"report",
null,
[],
[]
);

}

function search()
{

clearOutput();

let id = prompt("Enter Ticket ID");

if(!id) return;

Module.ccall(
"searchTicket",
null,
["number"],
[id]
);

}