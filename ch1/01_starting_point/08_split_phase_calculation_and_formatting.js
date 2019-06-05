'use strict';

const plays = require('./plays.json');
const invoices = require('./invoices.json');

function statement(invoice) {
    const statementData = {};
    // Change #2 - Move the data that comes from invoice into the intermediate data structure. So that all calculation code operates solely on data passes to it through statementData parameter
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    return renderPlainTest(statementData);    
}

function enrichPerformance(aPerformance) {
    // Perform a shallow copy
    const result = Object.assign({}, aPerformance);
    // Change #3 - Apply Move Function
    result.play = playFor(result);
    // Change #4 - Apply Move Function
    result.amount = amountFor(result);
    // Change #5 - Apply Move Function
    result.volumeCredits = volumeCreditFor(result);

    return result;
}

// Change #1 - Split Phase
function renderPlainTest(data) {
    let result = `Statement for ${data.customer}\n`
    
    for(let perf of data.performances) {
        // Print line for this order
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
    }

    result += `Amount owed is ${usd(data.totalAmount)}\n`;

    result += `You earned ${data.totalVolumeCredits} credits\n`;

    return result;
}

function amountFor(aPerformance) {
    let result = 0;

    switch(aPerformance.play.type) {
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
            throw new Error(`Unknown type: ${aPerformance.play.type}`);
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

function totalVolumeCredits(data) {
    let result = 0;

    for(let perf of data.performances) {
        result += perf.volumeCredits;
    }

    return result;
}

function totalAmount(data) {
    let result = 0

    for(let perf of data.performances) {
        result += perf.amount;
    }

    return result;
}

// Run the code
const result = statement(invoices[0]);
console.log(result);