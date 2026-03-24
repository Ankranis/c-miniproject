let selected=[];

let booked={
1:new Set(),
2:new Set(),
3:new Set()
};

function clearAll()
{
document.getElementById("output").innerText="";
document.getElementById("ui").innerHTML="";
}


function showBook()
{

clearAll();

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

let route=parseInt(
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

g+=`<div class="${cls}" onclick="pick(${i})">${i}</div>`;

}

g+="</div>";

document.getElementById("grid").innerHTML=g;

}


function pick(n)
{

let route=parseInt(
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

let name=
document.getElementById("name").value;

let route=
parseInt(
document.getElementById("route").value
);

let out=document.getElementById("output");

out.innerText="";

out.innerText+="Booking Confirmed\n";
out.innerText+="Name under which ticket(s) booked :- "+name+"\n\n";
out.innerText+="Tickets information :-\n";

for(let s of selected)
{

Module.ccall(
"menu",
null,
["number","number","number","number","string"],
[1,route-1,s,0,name]
);

booked[route].add(s);

}

selected=[];

makeGrid();

}


function cancel()
{

clearAll();

let id=prompt("Enter Ticket ID");
if(!id) return;

let route=prompt("Enter Route");
let seat=prompt("Enter Seat");

Module.ccall(
"cancelTicket",
null,
["number"],
[id]
);

route=parseInt(route);
seat=parseInt(seat);

if(booked[route])
booked[route].delete(seat);

makeGrid();

}


function search()
{

clearAll();

let id=prompt("Enter Ticket ID");

Module.ccall(
"searchTicket",
null,
["number"],
[id]
);

}


function report()
{

clearAll();

Module.ccall(
"report",
null,
[],
[]
);

}