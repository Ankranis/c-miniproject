let selected=[];

function showBook()
{
document.getElementById("ui").innerHTML=`
Name <input id=name><br>

Route
<select id=route>
<option value=0>1</option>
<option value=1>2</option>
<option value=2>3</option>
</select>

<div class=grid id=grid></div>

<button onclick=book()>Confirm</button>
`;

makeGrid();
}

function makeGrid()
{
let g=document.getElementById("grid");

g.innerHTML="";

for(let i=1;i<=12;i++)
{
let d=document.createElement("div");

d.className="seat";

d.innerText=i;

d.onclick=function()
{
if(d.classList.contains("selected"))
{
d.classList.remove("selected");
selected=selected.filter(x=>x!=i);
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

function book()
{
let name=document.getElementById("name").value;
let route=document.getElementById("route").value;

for(let s of selected)
{
Module.ccall(
"book",
null,
["number","number","string"],
[route,s,name]
);
}
}

function cancel()
{
let id=prompt("TicketID");

Module.ccall(
"cancelTicket",
null,
["number"],
[id]
);
}

function search()
{
let id=prompt("TicketID");

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