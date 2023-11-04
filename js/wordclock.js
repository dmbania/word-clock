// eslint-disable-next-line no-unused-vars
class WordClock {
    // define the wordclock matrix
    #rowsAndWords = [
        { words: [{ class: 'itis', word: 'it is' }, { class: 'half', word: 'half' }, { class: 'ten', word: 'ten' }] },
        { words: [{ class: 'quarter', word: 'a quarter' }, { class: 'twenty', word: 'twenty' }] },
        { words: [{ class: 'five', word: 'five' }, { class: 'minutes', word: 'minutes' }, { class: 'to', word: 'to' }] },
        { words: [{ class: 'past', word: 'past' }, { class: 'one', word: 'one' }, { class: 'three', word: 'three' }] },
        { words: [{ class: 'two', word: 'two' }, { class: 'four', word: 'four' }, { class: 'five2', word: 'five' }] },
        { words: [{ class: 'six', word: 'six' }, { class: 'seven', word: 'seven' }, { class: 'eight', word: 'eight' }] },
        { words: [{ class: 'nine', word: 'nine' }, { class: 'ten2', word: 'ten' }, { class: 'eleven', word: 'eleven' }] },
        { words: [{ class: 'twelve', word: 'twelve' }, { class: 'oclock', word: 'o\'clock' }] },
        { words: [{ class: 'midnight', word: 'midnight' }, { class: 'noon', word: 'noon' }] },
        { words: [{ class: 'inthe', word: 'in the' }, { class: 'morning', word: 'morning' }] },
        { words: [{ class: 'afternoon', word: 'afternoon' }, { class: 'evening', word: 'evening' }] },
        { words: [{ class: 'atnight', word: 'at night' }] },
    ];

    constructor() {
        this.#draw();
    }

    #drawClock(body) {
        //we'll do something here so that we'll do a bunch of checking
        //so that if the passed is an object we'll use it otherwise
        // we'll use the body.
        body = body || document.getElementsByTagName('body');

        //	define your clock
        const clockBox = document.createElement('div');
        clockBox.setAttribute('class', 'clock');

        //	for each row, and each element in the each row build your wordclock
        for (const row of this.#rowsAndWords) {
            const clockRow = document.createElement('div');
            clockRow.setAttribute('class', 'row');

            for (const word of row.words) {
                const wordSpan = document.createElement('span');
                wordSpan.setAttribute('class', word.class);
                wordSpan.textContent = word.word;
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

    #getDate() {
        const dateTime = new Date();
        const mins = dateTime.getMinutes();
        let hours24 = dateTime.getHours();
        let hours = dateTime.getHours() % 12;

        return {
            mins, hours24, hours
        };
    }

    #setTime() {
        let { mins, hours24, hours } = this.#getDate();

        this.#resetClock();

        //	when we are after the half hour we will talk about
        //  the number of minutes until the next hour
        const toAfterModifier = (mins > 34) ? 1 : 0;
        hours += toAfterModifier;

        if (mins > 5) {
            if (toAfterModifier === 1) {
                this.#turnOn('to');
            } else {
                this.#turnOn('past');
            }
        }

        this.#setMidnightNoon(hours24, toAfterModifier);
        this.#setMorningAfternoonEveningNight(hours24);
        this.#setHours(hours);
        this.#setMinutes(mins);
    }

    #setMorningAfternoonEveningNight(hours24) {
        if (hours24 >= 1 && hours24 <= 11) {
            this.#turnOn('inthe');
            this.#turnOn('morning');
        }

        if (hours24 >= 13 && hours24 < 17) {
            this.#turnOn('inthe');
            this.#turnOn('afternoon');
        }

        if (hours24 >= 17 && hours24 < 19) {
            this.#turnOn('inthe');
            this.#turnOn('evening');
        }

        if (hours24 >= 19 || hours24 === 23) {
            this.#turnOn('atnight');
        }
    }

    #setMidnightNoon(hours24, toAfterModifier) {
        if (toAfterModifier === 1) {
            return;
        }

        if (hours24 === 0) {
            this.#turnOn('midnight');
        }

        if (hours24 === 12) {
            this.#turnOn('noon');
        }
    }

    #setHours(hours) {
        const houseClasses = ['twelve', 'one', 'two', 'three', 'four', 'five2', 'six', 'seven', 'eight', 'nine', 'ten2', 'eleven'];
        this.#turnOn(houseClasses[hours]);
    }

    //	determine which 5-minutes do we need to display, then turn that word on
    #setMinutes(minutes) {
        const fiveMinuteBlock = Math.floor(minutes / 5) * 5;

        switch (fiveMinuteBlock) {
            case 5:
            case 55:
                this.#turnOn('five');
                break;
            case 10:
            case 50:
                this.#turnOn('ten');
                break;
            case 15:
            case 45:
                this.#turnOn('quarter');
                this.#turnOff('minutes');
                break;
            case 20:
            case 40:
                this.#turnOn('twenty');
                break;
            case 25:
            case 35:
                this.#turnOn('twenty');
                this.#turnOn('five');
                break;
            case 30:
                this.#turnOn('half');
                this.#turnOff('minutes');
                break;
            default:
                this.#turnOff('minutes');
        }
    }
}
