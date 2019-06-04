'use strict';

const plays = require('./plays.json');
const invoices = require('./invoices.json');

function statement(invoice, plays) {

    
    let result = `Statement for ${invoice.customer}\n`
    
    // Change #1 - Split Loop
    // let totalAmount = 0;
    for(let perf of invoice.performances) {
        // Print line for this order
        result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;

        // Change #5 - Extract Fcuntion
        // totalAmount += amountFor(perf);
    }

    // Change #2 - Slide Statement
    // let volumeCredits = 0;
    // for(let perf of invoice.performances) {
    //     volumeCredits += volumeCreditFor(perf);
    // }

    // Change #3 - Extract Function
    // let volumeCredits = totalVolumeCredits(invoice);

    // Change #6 - Inline Variable
    result += `Amount owed is ${usd(totalAmount(invoice))}\n`;

    // Change #4 - Inline Variable
    result += `You earned ${totalVolumeCredits(invoice)} credits\n`;

    return result;
}

function amountFor(aPerformance) {
    let result = 0;

    switch(playFor(aPerformance).type) {
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
            throw new Error(`Unknown type: ${playFor(aPerformance).type}`);
    }

    return result;
}

function playFor(aPerformance) {
    return plays[aPerformance.playID];
}

function volumeCreditFor(aPerformance) {
    let result = 0;

    // Add volume credits
    result += Math.max(aPerformance.audience - 30, 0);

    // Add extra credit for every ten comedy attendees
    if("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);

    return result;
}

function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
    {
        style: "currency", 
        currency: "USD",
        minimumFractionDigits: 2
    }).format(aNumber/100);
}

// Change #3 - Extract Function
function totalVolumeCredits(invoice) {
    // Change #6 - Rename Variable
    let result = 0;

    for(let perf of invoice.performances) {
        // Change #6 - Rename Variable
        result += volumeCreditFor(perf);
    }

    // Change #6 - Rename Variable
    return result;
}

// Change #5 - Extract Function
function totalAmount(invoice) {
    // Change #6 - Rename Variable
    let result = 0

    for(let perf of invoice.performances) {
        // Change #6 - Rename Variable
        result += amountFor(perf);
    }

    // Change #6 - Rename Variable
    return result;
}

// Run the code
const result = statement(invoices[0], plays);
console.log(result);