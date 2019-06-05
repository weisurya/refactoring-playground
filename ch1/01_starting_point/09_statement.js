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
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance;

        this.play = aPlay;
    }

    // Change #3 - Refactor by using Moving Function
    amount() {
        let result = 0;

        switch(this.play.type) {
            case "tragedy":
                result = 40000;
                
                if(this.audience > 30) {
                    result += 1000 * (this.audience - 30);
                }

                break;
            
            case "comedy":
                result = 30000;

                if(this.audience > 20) {
                    result += 10000 + 500 * (this.audience - 20);
                }

                result += 300 * this.audience;

                break;

            default:
                throw new Error(`Unknown type: ${this.play.type}`);
        }

        return result;
    }
}

function enrichPerformance(aPerformance) {
    // Change #1 - create calculator class
    // Change #2 - change function declaration
    const calculator = new PerformanceCalculator(aPerformance, playFor(aPerformance));

    const result = Object.assign({}, aPerformance);

    // Change #2 - change function declaration
    result.play = calculator.play;

    result.amount = amountFor(result);

    result.volumeCredits = volumeCreditFor(result);

    return result;
}

function amountFor(aPerformance) {
    // Change #3 - Refactor by using Moving Function
    return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount();
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