#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include "emscripten.h"

EM_JS(void, showMsg, (const char* msg), {
    Module.print(UTF8ToString(msg));
});

struct Ticket{
    int id;
    char name[50];
    int route;
    int seat;
    int fare;
};

int ticketCounter=1000;

int fares[3]={100,150,200};
int seats[3][21];


void init(){
    for(int i=0;i<3;i++){
        for(int j=1;j<=20;j++){
            seats[i][j]=0;
        }
    }
}


void resetSeats()
{
    for(int i=0;i<3;i++)
    {
        for(int j=1;j<=20;j++)
        {
            seats[i][j]=0;
        }
    }
}


void loadSeats(){

    resetSeats();

    FILE *f;

    int id,route,seat,fare;
    char name[50];

    f=fopen("tickets.txt","r");

    if(f==NULL) return;

    while(
    fscanf(
    f,
    "%d %s %d %d %d",
    &id,name,&route,&seat,&fare
    )!=EOF
    ){
        seats[route][seat]=1;
    }

    fclose(f);
}


int generateID(){
    ticketCounter++;
    return ticketCounter;
}


void saveTicket(struct Ticket t){

    FILE *f;

    f=fopen("tickets.txt","a");

    if(f==NULL){
        showMsg("File error");
        return;
    }

    fprintf(
    f,
    "%d %s %d %d %d\n",
    t.id,
    t.name,
    t.route,
    t.seat,
    t.fare
    );

    fclose(f);
}


void book(int route,int seat,char name[])
{

    loadSeats();

    struct Ticket t;

    if(route<0 || route>2){
        showMsg("Invalid route");
        return;
    }

    if(seat<1 || seat>20){
        showMsg("Invalid seat");
        return;
    }

    if(seats[route][seat]==1){
        showMsg("Seat already booked");
        return;
    }

    t.id=generateID();
    strcpy(t.name,name);
    t.route=route;
    t.seat=seat;
    t.fare=fares[route];

    seats[route][seat]=1;

    saveTicket(t);

    char buf[200];

    sprintf(
    buf,
    "TicketID=%d Route=%d Seat=%d Fare=%d",
    t.id,
    route+1,
    seat,
    t.fare
    );

    showMsg(buf);

}


void cancelTicket(int id)
{

loadSeats();

FILE *f,*temp;

int tid,route,seat,fare;
char name[50];

f=fopen("tickets.txt","r");
temp=fopen("temp.txt","w");

if(f==NULL) return;

while(
fscanf(
f,
"%d %s %d %d %d",
&tid,name,&route,&seat,&fare
)!=EOF
)
{

if(tid==id)
{
showMsg("Cancelled");
}
else
{
fprintf(
temp,
"%d %s %d %d %d\n",
tid,name,route,seat,fare
);
}

}

fclose(f);
fclose(temp);

remove("tickets.txt");
rename("temp.txt","tickets.txt");

}


void searchTicket(int id)
{

loadSeats();

FILE *f;

int tid,route,seat,fare;
char name[50];

f=fopen("tickets.txt","r");

if(f==NULL)
{
showMsg("Not found");
return;
}

while(
fscanf(
f,
"%d %s %d %d %d",
&tid,name,&route,&seat,&fare
)!=EOF
)
{

if(tid==id)
{

char buf[200];

sprintf(
buf,
"Ticket Found\nName: %s\nRoute: %d\nSeat: %d\nFare: %d",
name,
route+1,
seat,
fare
);

showMsg(buf);

fclose(f);
return;
}

}

showMsg("Not found");

fclose(f);

}


void report()
{

loadSeats();

int r[3]={0,0,0};
int m[3]={0,0,0};

int id,route,seat,fare;
char name[50];

FILE *f;

f=fopen("tickets.txt","r");

if(f==NULL)
{
showMsg("No data");
return;
}

while(
fscanf(
f,
"%d %s %d %d %d",
&id,name,&route,&seat,&fare
)!=EOF
)
{
r[route]++;
m[route]+=fare;
}

fclose(f);

int total=m[0]+m[1]+m[2];

char buf[500];

sprintf(
buf,

"Route 1:\n%d tickets booked\nRevenue generated - %d rupees\n\n"
"Route 2:\n%d tickets booked\nRevenue generated - %d rupees\n\n"
"Route 3:\n%d tickets booked\nRevenue generated - %d rupees\n\n"
"Total revenue generated - %d rupees",

r[0],m[0],
r[1],m[1],
r[2],m[2],
total
);

showMsg(buf);

}


/* SWITCH CASE MENU */

void menu(int ch,int route,int seat,int id,char name[])
{

    switch(ch)
    {

        case 1:
            book(route,seat,name);
        break;

        case 2:
            cancelTicket(id);
        break;

        case 3:
            searchTicket(id);
        break;

        case 4:
            report();
        break;

        default:
            showMsg("Wrong choice");
    }

}


int main(){

    init();
    loadSeats();

    return 0;
}