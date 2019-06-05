'use strict';

const plays = require('./plays.json');

module.exports = function (invoice) {
    const statementData = {};

    statementData.customer = invoice.customer;

    statementData.performances = invoice.performances.map(enrichPerformance);

    statementData.totalAmount = totalAmount(statementData);

    statementData.totalVolumeCredits = totalVolumeCredits(statementData);

    return statementData;
}

// Change #1 - create calculator class
class PerformanceCalculator {
    constructor(aPerformance) {
        this.performance = aPerformance;
    }
}

function enrichPerformance(aPerformance) {
    // Change #1 - create calculator class
    const calculator = new PerformanceCalculator(aPerformance);

    const result = Object.assign({}, aPerformance);

    result.play = playFor(result);

    result.amount = amountFor(result);

    result.volumeCredits = volumeCreditFor(result);

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

function volumeCreditFor(aPerformance) {
    let result = 0;

    result += Math.max(aPerformance.audience - 30, 0);

    if("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);

    return result;
}

function playFor(aPerformance) {
    return plays[aPerformance.playID];
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