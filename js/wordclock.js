WordClock = (function(){
	return function (){

		this.drawClock = function (b) {
	
			//we'll do something here so that we'll do a bunch of checking
			//so that if the passed is an object we'll use it otherwise
			// we'll use the body.
			b = b || document.getElementsByTagName('body');
			var rows = {
				'r1' : {'itis' : 'it is', 'half' : 'half', 'ten' :'ten'}
				, 'r2' : {'quarter' : 'quarter', 'twenty':'twenty'}
				, 'r3' : {'five': 'five', 'minutes':'minutes', 'to':'to'}
				, 'r4' : {'past':'past', 'one':'one', 'three':'three'}
				, 'r5' : {'two':'two', 'four':'four', 'five2':'five'}
				, 'r6' : {'six':'six', 'seven':'seven', 'eight':'eight'}
				, 'r7' : {'nine':'nine', 'ten2':'ten', 'eleven':'eleven'}
				, 'r8' : {'twelve':'twelve', 'oclock':'o\'clock'}
			};
	
			var clck = document.createElement('div');
			clck.setAttribute("class", "clock");
	
			for (var row in rows) {

				var r = document.createElement("div");
				r.setAttribute('class', 'row');

				for (var spn in rows[row]) {
					var s = document.createElement('span');
					s.setAttribute('class', spn);
					s.textContent = rows[row][spn];
					r.appendChild(s);
				}
	
				clck.appendChild(r);
			}
	
			b[0].appendChild(clck);
		}

		this.setTime = function() { 
			var dt = new Date();
			var hrs = dt.getHours();
			var mins = dt.getMinutes();
	
			this.resetClock();
	
			var modifier = (mins > 34) ? 1 : 0;
	
			hrs += modifier;
	
			var a = ["twelve", "one", "two", "three", "four", "five2", "six", "seven", "eight", "nine", "ten2", "eleven"];

			for(idx=0; idx < 12; idx++) {
				if (hrs % 12 == idx) {
					this.turnOn(a[idx]);
					break;
				}
			}
	
			var new_mins = Math.floor(mins / 5) * 5;;
	
			switch (new_mins) {
				case 5:  this.turnOn("five"); this.turnOn("past"); break;
				case 10: this.turnOn("ten"); this.turnOn("past"); break;
				case 15: this.turnOn("quarter"); this.turnOff("minutes"); this.turnOn("past"); break;
				case 20: this.turnOn("twenty"); this.turnOn("past"); break;
				case 25: this.turnOn("twenty"); this.turnOn("five"); this.turnOn("past"); break;
				case 30: this.turnOn("half"); this.turnOff("minutes"); this.turnOn("past"); break;
				case 35: this.turnOn("twenty"); this.turnOn("five"); this.turnOn("to"); break;
				case 40: this.turnOn("twenty"); this.turnOn("to"); break;
				case 45: this.turnOn("quarter"); this.turnOff("minutes"); this.turnOn("to"); break;
				case 50: this.turnOn("ten"); this.turnOn("to"); break;
				case 55: this.turnOn("five"); this.turnOn("to"); break;
				default: this.turnOff("minutes");
		
			}
		}

		this.resetClock = function() {
			var clck = document.getElementsByClassName("clock");
			var rws = clck[0].children;
			var r_len = rws.length;

			for (idx=0; idx < r_len; idx++) {

			    spns = rws[idx].children;
				var s_len = spns.length;

				for(jdx=0; jdx < s_len; jdx++) {
				   this.turnOff(spns[jdx]);
			    }	
			}
	
			this.turnOn('itis'); this.turnOn('oclock'); this.turnOn("minutes");
		}

		this.turnOff = function(el) {
			if (typeof el === 'object') {
				el.className = el.className.replace(" on", "");
			} else {
				var i = document.getElementsByClassName(el);
				i[0].className = i[0].className.replace(" on", "");
			}
		}

		this.turnOn = function(el) {
			if (typeof el === 'object') {
				el.className = el.className + " on";
			} else {
				var i = document.getElementsByClassName(el);
				i[0].className = i[0].className + " on"; 
			}
		}
	}
})();

WordClock.prototype.draw = function() {
	this.drawClock();
	this.setTime(new Date());
	var obj = this;
	setInterval(function(){obj.setTime(new Date())}, 1000);
}
