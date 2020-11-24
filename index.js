const Backoff = function (options = {}) {
	this.min = options.min || 1000;
	this.max = options.max || 60000;
	this.factor = options.factor || 2;
	this.jitter = options.jitter || 0;
	this.attempts = 0;
};

Backoff.prototype.duration = function () {
	let time = this.min * Math.pow(this.factor, this.attempts);

	this.attempts++;
	if (this.jitter) {
		const deviation = Math.round(Math.random() * this.jitter * this.min * 2);
		time += this.jitter * this.min - deviation;
	}

	return Math.floor(Math.min(time, this.max));
};

Backoff.prototype.reset = function () {
	this.attempts = 0;
};

module.exports = Backoff;
