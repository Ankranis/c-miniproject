#include <stdio.h>
#include <stdlib.h>
#include <string.h>

struct Ticket
{
    int ticketID;
    char name[50];
    int route;
    int seat;
    float fare;
};

struct Ticket t;
int id = 1000;

float fare[3] = {100, 150, 200};
int seats[3] = {5, 5, 5};

void book();
void cancelTicket();
void search();
void report();
void showSeats();

int main()
{
    int ch;

    while (1)
    {
        printf("\n1 Book\n2 Cancel\n3 Search\n4 Seats\n5 Report\n6 Exit\n");
        scanf("%d", &ch);

        switch (ch)
        {
        case 1:
            book();
            break;

        case 2:
            cancelTicket();
            break;

        case 3:
            search();
            break;

        case 4:
            showSeats();
            break;

        case 5:
            report();
            break;

        case 6:
            exit(0);

        default:
            printf("Invalid\n");
        }
    }
}

void book()
{
    FILE *f = fopen("ticket.txt", "a");

    printf("Enter name: ");
    scanf("%s", t.name);

    printf("Route (0-2): ");
    scanf("%d", &t.route);

    if (t.route < 0 || t.route > 2)
    {
        printf("Invalid route\n");
        return;
    }

    printf("Seat number: ");
    scanf("%d", &t.seat);

    if (t.seat < 1 || t.seat > seats[t.route])
    {
        printf("Invalid seat\n");
        return;
    }

    t.ticketID = id++;
    t.fare = fare[t.route];

    fprintf(f, "%d %s %d %d %f\n",
            t.ticketID,
            t.name,
            t.route,
            t.seat,
            t.fare);

    fclose(f);

    printf("Booked TicketID = %d\n", t.ticketID);
}

void cancelTicket()
{
    FILE *f = fopen("ticket.txt", "r");
    FILE *temp = fopen("temp.txt", "w");

    int tid;
    int found = 0;

    printf("Enter TicketID: ");
    scanf("%d", &tid);

    while (fscanf(f, "%d %s %d %d %f",
                  &t.ticketID,
                  t.name,
                  &t.route,
                  &t.seat,
                  &t.fare) != EOF)
    {
        if (t.ticketID == tid)
        {
            found = 1;
            continue;
        }

        fprintf(temp, "%d %s %d %d %f\n",
                t.ticketID,
                t.name,
                t.route,
                t.seat,
                t.fare);
    }

    fclose(f);
    fclose(temp);

    remove("ticket.txt");
    rename("temp.txt", "ticket.txt");

    if (found)
        printf("Cancelled\n");
    else
        printf("Not found\n");
}

void search()
{
    FILE *f = fopen("ticket.txt", "r");

    int tid;
    int found = 0;

    printf("Enter TicketID: ");
    scanf("%d", &tid);

    while (fscanf(f, "%d %s %d %d %f",
                  &t.ticketID,
                  t.name,
                  &t.route,
                  &t.seat,
                  &t.fare) != EOF)
    {
        if (t.ticketID == tid)
        {
            printf("%d %s %d %d %.2f\n",
                   t.ticketID,
                   t.name,
                   t.route,
                   t.seat,
                   t.fare);

            found = 1;
        }
    }

    if (!found)
        printf("Not found\n");

    fclose(f);
}

void showSeats()
{
    int r;

    printf("Route (0-2): ");
    scanf("%d", &r);

    if (r < 0 || r > 2)
    {
        printf("Invalid\n");
        return;
    }

    printf("Seats available: %d\n", seats[r]);
}

void report()
{
    FILE *f = fopen("ticket.txt", "r");

    int count[3] = {0};
    float money[3] = {0};

    while (fscanf(f, "%d %s %d %d %f",
                  &t.ticketID,
                  t.name,
                  &t.route,
                  &t.seat,
                  &t.fare) != EOF)
    {
        count[t.route]++;
        money[t.route] += t.fare;
    }

    for (int i = 0; i < 3; i++)
    {
        printf("Route %d Tickets=%d Money=%.2f\n",
               i,
               count[i],
               money[i]);
    }

    fclose(f);
}