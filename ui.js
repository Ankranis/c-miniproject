function clearOutput()
{
document.getElementById("output").innerText="";
}
let selected=[];

let booked={
1:new Set(),
2:new Set(),
3:new Set()
};

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

let g="<div class='grid'>";

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

g+="</div>";

document.getElementById("grid").innerHTML=g;

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

document.getElementById("output").innerText=text;

makeGrid();
let g="<div class='grid'>";
}

function cancel()
{

clearOutput();

let id = prompt("Enter Ticket ID");

Module.ccall(
"cancelTicket",
null,
["number"],
[id]
);

// reload seats from file not possible,
// so easiest → reset UI memory

booked={
1:new Set(),
2:new Set(),
3:new Set()
};

selected=[];

showBook();

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