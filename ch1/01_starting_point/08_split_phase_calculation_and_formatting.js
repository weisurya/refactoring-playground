'use strict';

// Change #7 - Replace Loop with Pipeline
const CreateStatementData =  require('./08_statement');

const invoices = require('./invoices.json');

function statement(invoice) {
    // Change #7 - Replace Loop with Pipeline
    return renderPlainTest(CreateStatementData(invoice));    
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

function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
    {
        style: "currency", 
        currency: "USD",
        minimumFractionDigits: 2
    }).format(aNumber/100);
}

// Run the code
const result = statement(invoices[0]);
console.log(result);