// eslint-disable-next-line no-unused-vars
class WordClock {
    constructor() {
        this.#draw();
    }

    #drawClock(b) {
        //we'll do something here so that we'll do a bunch of checking
        //so that if the passed is an object we'll use it otherwise
        // we'll use the body.
        b = b || document.getElementsByTagName('body');

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
        const clck = document.createElement('div');
        clck.setAttribute('class', 'clock');

        //	for each row, and each element in the each row build your wordclock
        for (const row in rows) {
            const r = document.createElement('div');
            r.setAttribute('class', 'row');

            for (const spn in rows[row]) {
                const s = document.createElement('span');
                s.setAttribute('class', spn);
                s.textContent = rows[row][spn];
                r.appendChild(s);
            }

            clck.appendChild(r);
        }

        //	put your clock on the page
        b[0].appendChild(clck);
    }

    #draw() {
        this.#drawClock();
        this.#setTime(new Date());
        setInterval(() => { this.#setTime(new Date()); }, 1000);
    }

    // turn all your words off. Turn on It Is, O'Clock, and Minutes
    #resetClock() {
        const clck = document.getElementsByClassName('clock');
        const rws = clck[0].children;

        for (const row of rws) {
            const spns = row.children;

            for (const spn of spns) {
                this.#turnOff(spn);
            }
        }

        this.#turnOn('itis'); this.#turnOn('oclock'); this.#turnOn('minutes');
    }

    // turn off, whatever element passed to this by removing the 'on' class
    #turnOff(el) {
        if (typeof el === 'object') {
            el.className = el.className.replace(' on', '');
        } else {
            const i = document.getElementsByClassName(el);
            i[0].className = i[0].className.replace(' on', '');
        }
    }

    // turn on, whatever element passed to this by adding the 'on' class
    #turnOn(el) {
        if (typeof el === 'object') {
            el.className = el.className + ' on';
        } else {
            const i = document.getElementsByClassName(el);
            i[0].className = i[0].className + ' on';
        }
    }

    #setTime() {
        const dateTime = new Date();
        const mins = dateTime.getMinutes();
        let hours = dateTime.getHours();

        this.#resetClock();

        //	when we are after the half hour we will talk about the number of minutes until
        //	the next hour
        const modifier = (mins > 34) ? 1 : 0;
        hours += modifier;

        if (mins > 5) {
            if (modifier === 1) {
                this.#turnOn('to');
            } else {
                this.#turnOn('past');
            }
        }

        //	for some reason I had the thought figuring out the 12-hour hour should be done looping through the next
        //	array and turning on that hour number.
        const a = ['twelve', 'one', 'two', 'three', 'four', 'five2', 'six', 'seven', 'eight', 'nine', 'ten2', 'eleven'];
        for (let idx = 0; idx < 12; idx++) {
            if (hours % 12 == idx) {
                this.#turnOn(a[idx]);
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
