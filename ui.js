let selected=[];

let booked={
1:new Set(),
2:new Set(),
3:new Set()
};

let ticketMap={};

let buffer="";


function clearAll()
{
document.getElementById("output").innerText="";
document.getElementById("ui").innerHTML="";
buffer="";
}


Module.print=function(text)
{
buffer+=text+"\n";

let m=text.match(/TicketID=(\d+) Route=(\d+) Seat=(\d+)/);

if(m)
{
let id=parseInt(m[1]);
let r=parseInt(m[2]);
let s=parseInt(m[3]);

ticketMap[id]={route:r,seat:s};

booked[r].add(s);
}
};


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
`<div class="${cls}" onclick="pick(${i})">${i}</div>`;

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

buffer="";

let name=
document.getElementById("name").value;

let route=
parseInt(
document.getElementById("route").value
);

let text="";

text+="Booking Confirmed\n";
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

}

text += buffer;

document.getElementById("output").innerText=text;

selected=[];
makeGrid();

}


function cancel()
{

clearAll();

let id=prompt("Enter Ticket ID");

if(!id) return;

Module.ccall(
"cancelTicket",
null,
["number"],
[id]
);

id=parseInt(id);

if(ticketMap[id])
{
let r=ticketMap[id].route;
let s=ticketMap[id].seat;

if(booked[r])
booked[r].delete(s);

delete ticketMap[id];
}

makeGrid();

}


function search()
{

clearAll();

let id=prompt("Enter Ticket ID");

if(!id) return;

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