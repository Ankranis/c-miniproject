let selectedSeats = [];

function showBook()
{
    let html = `
    Name:<input id="name"><br>

    Route:
    <select id="route">
    <option value="1">Route1</option>
    <option value="2">Route2</option>
    <option value="3">Route3</option>
    </select>

    <div class="grid" id="grid"></div>

    <button onclick="book()">Confirm</button>
    `;

    document.getElementById("ui").innerHTML = html;

    makeGrid();
}

function makeGrid()
{
    let g = document.getElementById("grid");
    g.innerHTML = "";

    for(let i=1;i<=12;i++)
    {
        let d = document.createElement("div");

        d.className="seat";

        d.innerText=i;

        d.onclick=function()
        {
            if(d.classList.contains("selected"))
            {
                d.classList.remove("selected");
                selectedSeats = selectedSeats.filter(x=>x!=i);
            }
            else
            {
                d.classList.add("selected");
                selectedSeats.push(i);
            }
        };

        g.appendChild(d);
    }
}

function book()
{
    let name = document.getElementById("name").value;
    let route = document.getElementById("route").value;

    if(name=="" || selectedSeats.length==0)
    {
        alert("Enter data");
        return;
    }

    for(let s of selectedSeats)
    {
        Module.ccall(
            "book",
            "number",
            ["string","number","number"],
            [name,route,s]
        );
    }

    alert("Booked");
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

    alert("Cancelled");
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