#include<stdio.h>
#include<stdlib.h>
#include<string.h>

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
    int i,j;
    for(i=0;i<3;i++){
        for(j=1;j<=20;j++){
            seats[i][j]=0;
        }
    }
}

int generateID(){
    ticketCounter++;
    return ticketCounter;
}

void saveTicket(struct Ticket t){
    FILE *f;

    f=fopen("tickets.txt","a");

    if(f==NULL){
        printf("File error\n");
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

void book(int route,int seat,char name[]){

    struct Ticket t;

    if(route<0 || route>2){
        printf("Invalid route\n");
        return;
    }

    if(seat<1 || seat>20){
        printf("Invalid seat\n");
        return;
    }

    if(seats[route][seat]==1){
        printf("Seat already booked\n");
        return;
    }

    t.id=generateID();
    strcpy(t.name,name);
    t.route=route;
    t.seat=seat;
    t.fare=fares[route];

    seats[route][seat]=1;

    saveTicket(t);

    printf("Booked TicketID=%d Seat=%d\n",t.id,seat);
}

void cancelTicket(int id){

    FILE *f,*temp;

    int tid,route,seat,fare;
    char name[50];

    f=fopen("tickets.txt","r");
    temp=fopen("temp.txt","w");

    while(
    fscanf(
    f,
    "%d %s %d %d %d",
    &tid,name,&route,&seat,&fare
    )!=EOF
    ){

        if(tid==id){

            seats[route][seat]=0;
            printf("Cancelled\n");

        }else{

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

void searchTicket(int id){

    FILE *f;

    int tid,route,seat,fare;
    char name[50];

    f=fopen("tickets.txt","r");

    while(
    fscanf(
    f,
    "%d %s %d %d %d",
    &tid,name,&route,&seat,&fare
    )!=EOF
    ){

        if(tid==id){

            printf(
            "Found %s Route=%d Seat=%d Fare=%d\n",
            name,route,seat,fare
            );

            fclose(f);
            return;
        }
    }

    printf("Not found\n");

    fclose(f);
}

void showSeats(int route){

    int i;

    if(route<0 || route>2){
        printf("Invalid route\n");
        return;
    }

    for(i=1;i<=20;i++){

        if(seats[route][i]==0){
            printf("%d free\n",i);
        }else{
            printf("%d booked\n",i);
        }
    }
}

void report(){

    int r[3]={0,0,0};
    int m[3]={0,0,0};

    int id,route,seat,fare;
    char name[50];

    FILE *f;

    f=fopen("tickets.txt","r");

    while(
    fscanf(
    f,
    "%d %s %d %d %d",
    &id,name,&route,&seat,&fare
    )!=EOF
    ){

        r[route]++;
        m[route]+=fare;
    }

    printf("Report\n");

    for(int i=0;i<3;i++){
        printf(
        "Route %d Tickets=%d Revenue=%d\n",
        i,r[i],m[i]
        );
    }

    fclose(f);
}

/* MENU FUNCTION (important for marks) */

void menu(int ch,int route,int seat,int id,char name[]){

    switch(ch){

        case 1:{
            book(route,seat,name);
        }break;

        case 2:{
            cancelTicket(id);
        }break;

        case 3:{
            searchTicket(id);
        }break;

        case 4:{
            showSeats(route);
        }break;

        case 5:{
            report();
        }break;

        default:{
            printf("Wrong choice\n");
        }

    }

}

int main(){

    init();

    printf("Ready\n");

    return 0;
}