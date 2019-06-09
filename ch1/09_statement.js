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
    get amount() {
        throw new Error('Subclass responsibility!');
    }

    // Change #5 - Refactor by using Moving Function
    get volumeCredits() {
        // Change #9 - Refactor by using replace conditional with polymorphism
        return Math.max(this.performance.audience - 30, 0);
    }
}

// Change #6 - Refactor by using replace conditional with polymorphism
class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;

        if(this.audience > 30) {
            result += 1000 * (this.audience - 30);
        }

        return result;
    }
}

// Change #7 - Refactor by using replace conditional with polymorphism
class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 30000;

        if(this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }

        result += 300 * this.performance.audience;

        return result;
    }
    
    // Change #9 - Refactor by using replace conditional with polymorphism
    get volumeCredits() {
        return super.volumeCredits + Math.floor(this.performance.audience / 5);
    }
}

// Change #6 - Replace constructor with factory function
function createPerformanceCalculator(aPerformance, aPlay) {
    // Change #8 - Refactor by using replace conditional with polymorphism
    switch(aPlay.type) {
        case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
        case "comedy": return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error(`Unknown type: ${aPlay.type}`);
    }
}

function enrichPerformance(aPerformance) {
    // Change #1 - create calculator class
    // Change #2 - change function declaration
    // Change #6 - Replace constructor with factory function
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));

    const result = Object.assign({}, aPerformance);

    // Change #2 - change function declaration
    result.play = calculator.play;

    // Change @4 - Inline Function
    result.amount = calculator.amount;

    result.volumeCredits = calculator.volumeCredits;

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