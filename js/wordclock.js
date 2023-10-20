// eslint-disable-next-line no-unused-vars
class WordClock {
    constructor() {
        this.#draw();
    }

    #drawClock(body) {
        //we'll do something here so that we'll do a bunch of checking
        //so that if the passed is an object we'll use it otherwise
        // we'll use the body.
        body = body || document.getElementsByTagName('body');

        // define the wordclock matrix
        const rows = {
            'r1': { 'itis': 'it is', 'half': 'half', 'ten': 'ten' },
            'r2': { 'quarter': 'quarter', 'twenty': 'twenty' },
            'r3': { 'five': 'five', 'minutes': 'minutes', 'to': 'to' },
            'r4': { 'past': 'past', 'one': 'one', 'three': 'three' },
            'r5': { 'two': 'two', 'four': 'four', 'five2': 'five' },
            'r6': { 'six': 'six', 'seven': 'seven', 'eight': 'eight' },
            'r7': { 'nine': 'nine', 'ten2': 'ten', 'eleven': 'eleven' },
            'r8': { 'twelve': 'twelve', 'oclock': 'o\'clock' }
        };

        //	define your clock
        const clockBox = document.createElement('div');
        clockBox.setAttribute('class', 'clock');

        //	for each row, and each element in the each row build your wordclock
        for (const row in rows) {
            const clockRow = document.createElement('div');
            clockRow.setAttribute('class', 'row');

            for (const clockWord in rows[row]) {
                const wordSpan = document.createElement('span');
                wordSpan.setAttribute('class', clockWord);
                wordSpan.textContent = rows[row][clockWord];
                clockRow.appendChild(wordSpan);
            }

            clockBox.appendChild(clockRow);
        }

        //	put your clock on the page
        body[0].appendChild(clockBox);
    }

    #draw() {
        this.#drawClock();
        this.#setTime(new Date());
        setInterval(() => { this.#setTime(new Date()); }, 1000);
    }

    // turn all your words off. Turn on It Is, O'Clock, and Minutes
    #resetClock() {
        const clockBox = document.getElementsByClassName('clock');
        const clockRows = clockBox[0].children;

        for (const row of clockRows) {
            for (const clockWord of row.children) {
                this.#turnOff(clockWord);
            }
        }

        this.#turnOn('itis');
        this.#turnOn('oclock');
        this.#turnOn('minutes');
    }

    // turn off, whatever element passed to this by removing the 'on' class
    #turnOff(clockWord) {
        if (typeof clockWord === 'object') {
            clockWord.className = clockWord.className.replace(' on', '');
        } else {
            const clockWordById = document.getElementsByClassName(clockWord);
            clockWordById[0].className = clockWordById[0].className.replace(' on', '');
        }
    }

    // turn on, whatever element passed to this by adding the 'on' class
    #turnOn(clockWord) {
        if (typeof clockWord === 'object') {
            clockWord.className = clockWord.className + ' on';
        } else {
            const clockWordById = document.getElementsByClassName(clockWord);
            clockWordById[0].className = clockWordById[0].className + ' on';
        }
    }

    #setTime() {
        const dateTime = new Date();
        const mins = dateTime.getMinutes();
        let hours = dateTime.getHours();

        this.#resetClock();

        //	when we are after the half hour we will talk about the number of minutes until
        //	the next hour
        const toAfterModifier = (mins > 34) ? 1 : 0;
        hours += toAfterModifier;

        if (mins > 5) {
            if (toAfterModifier === 1) {
                this.#turnOn('to');
            } else {
                this.#turnOn('past');
            }
        }

        //	for some reason I had the thought figuring out the 12-hour hour should be done looping through the next
        //	array and turning on that hour number.
        const houseClasses = ['twelve', 'one', 'two', 'three', 'four', 'five2', 'six', 'seven', 'eight', 'nine', 'ten2', 'eleven'];
        for (let idx = 0; idx < 12; idx++) {
            if (hours % 12 == idx) {
                this.#turnOn(houseClasses[idx]);
                break;
            }
        }

        //	determine which 5-minutes do we need to display, then turn that word on
        const fiveMinuteBlock = Math.floor(mins / 5) * 5;

        switch (fiveMinuteBlock) {
            case 5:
                this.#turnOn('five');
                break;
            case 10:
                this.#turnOn('ten');
                break;
            case 15:
                this.#turnOn('quarter');
                this.#turnOff('minutes');
                break;
            case 20:
                this.#turnOn('twenty');
                break;
            case 25:
                this.#turnOn('twenty');
                this.#turnOn('five');
                break;
            case 30:
                this.#turnOn('half');
                this.#turnOff('minutes');
                break;
            case 35:
                this.#turnOn('twenty');
                this.#turnOn('five');
                break;
            case 40:
                this.#turnOn('twenty');
                break;
            case 45:
                this.#turnOn('quarter');
                this.#turnOff('minutes');
                break;
            case 50:
                this.#turnOn('ten');
                break;
            case 55:
                this.#turnOn('five');
                break;
            default:
                this.#turnOff('minutes');
        }
    }
}
