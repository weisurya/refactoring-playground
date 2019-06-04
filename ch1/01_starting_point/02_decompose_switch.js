'use strict';

const plays = require('./plays.json');
const invoices = require('./invoices.json');

function statement(invoice, plays) {

    let totalAmount = 0;
    
    let volumeCredits = 0;
    
    let result = `Statement for ${invoice.customer}\n`

    const format = new Intl.NumberFormat("en-US",
                            {
                                style: "currency", 
                                currency: "USD",
                                minimumFractionDigits: 2
                            }).format;
    
    for(let perf of invoice.performances) {

        const play = plays[perf.playID];

        // Change #1 - Extract Function
        let thisAmount = amountFor(perf, play);

        // Add volume credits
        volumeCredits += Math.max(perf.audience - 30, 0);

        // Add extra credit for every ten comedy attendees
        if("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

        // Print line for this order
        result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience} seats)\n`;

        totalAmount += thisAmount;
    }

    result += `Amount owed is ${format(totalAmount / 100)}\n`;

    result += `You earned ${volumeCredits} credits\n`;

    return result;
}

// Change #3 - Rename parameter
function amountFor(aPerformance, play) {
    // Change #2 - Rename variable
    let result = 0;

    switch(play.type) {
        case "tragedy":
            result = 40000;
            
            if(aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
            }

            break;
        
        case "comedy":
            result = 30000;

            if(aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
            }

            result += 300 * aPerformance.audience;

            break;

        default:
            throw new Error(`Unknown type: ${play.type}`);
    }

    return result;
}

// Run the code
const result = statement(invoices[0], plays);
console.log(result);