"use strict";
// Queue
// FIFO = First In, First Out
class Queue {
    constructor() {
        this.data = [];
    }
    enqueue(x) {
        this.data.push(x);
    }
    dequeue() {
        return this.data.shift();
    }
    getSize() {
        return this.data.length;
    }
    isEmpty() {
        return (this.data.length === 0);
    }
    see() {
    }
}
class TicketDispenser {
    constructor() {
        this.q = new Queue();
        this.nextTicketNumber = 1;
        this.totalProcessedTickets = 0;
        this.processedTicketLog = [];
    }
    getTicket() {
        const ticket = {
            ticketNumber: this.nextTicketNumber,
            startTime: Date.now(),
            peopleInFront: this.q.getSize()
        };
        this.q.enqueue(ticket);
        this.nextTicketNumber += 1;
        return ticket;
    }
    processTicket() {
        const processedTicket = this.q.dequeue();
        processedTicket.endTime = Date.now();
        this.totalProcessedTickets += 1;
        this.processedTicketLog.push(processedTicket);
        console.log("completed ticket: ", processedTicket);
    }
    getStatus() {
        return {
            peopleInQueue: this.q.getSize(),
            totalProcessedTickets: this.totalProcessedTickets
        };
    }
    getProcessedTicketsStats() {
        let longestTicket = this.processedTicketLog[0], shortestTicket = this.processedTicketLog[0], totalDuration = 0;
        this.processedTicketLog.forEach(ticket => {
            const currentDuration = (ticket.endTime === undefined) ? 0 : ticket.endTime - ticket.startTime;
            const longestTicketDuration = (longestTicket.endTime === undefined) ? 0 : longestTicket.endTime - longestTicket.startTime;
            if (currentDuration > longestTicketDuration)
                longestTicket = ticket;
            const shortestTicketDuration = (shortestTicket.endTime === undefined) ? 0 : shortestTicket.endTime - shortestTicket.startTime;
            if (currentDuration < shortestTicketDuration)
                shortestTicket = ticket;
            totalDuration += currentDuration;
        });
        return {
            longestTicket: longestTicket,
            shortestTicket: shortestTicket,
            processingTicketAverageDuration: totalDuration / this.processedTicketLog.length
        };
    }
}
const dispenser = new TicketDispenser();
const ticket1 = dispenser.getTicket();
console.log("first ticket: ", ticket1);
const ticket2 = dispenser.getTicket();
console.log("second ticket: ", ticket2);
const ticket3 = dispenser.getTicket();
console.log("third ticket: ", ticket3);
setTimeout(() => dispenser.processTicket(), 5000);
setTimeout(() => dispenser.processTicket(), 3000);
const ticket4 = dispenser.getTicket();
console.log("fourth ticket: ", ticket4);
console.log("current ticket dispenser status: ", dispenser.getStatus());
setTimeout(() => { console.log("stats: ", dispenser.getProcessedTicketsStats()); }, 8000);
console.log();
//# sourceMappingURL=QUIEUE.js.map