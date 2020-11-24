const test = require('ava');
const Backoff = require('.');

test('Should return increasing durations', t => {
	const b = new Backoff();

	t.is(b.duration(), 1000);
	t.is(b.duration(), 2000);
	t.is(b.duration(), 4000);
	t.is(b.duration(), 8000);
	t.is(b.duration(), 16000);
});

test('Should stop increasing on maximum duration', t => {
	const b = new Backoff();

	t.is(b.duration(), 1000);
	t.is(b.duration(), 2000);
	t.is(b.duration(), 4000);
	t.is(b.duration(), 8000);
	t.is(b.duration(), 16000);
	t.is(b.duration(), 32000);
	t.is(b.duration(), 60000);
	t.is(b.duration(), 60000);
});

test('Should start at the minimum duration when reset', t => {
	const b = new Backoff();

	t.is(b.duration(), 1000);
	t.is(b.duration(), 2000);
	t.is(b.duration(), 4000);
	t.is(b.duration(), 8000);
	t.is(b.duration(), 16000);

	b.reset();
	t.is(b.duration(), 1000);
	t.is(b.duration(), 2000);
	t.is(b.duration(), 4000);

	b.reset();
	t.is(b.duration(), 1000);
	t.is(b.duration(), 2000);
});

test('Should support configurable minimum and maximum', t => {
	const b = new Backoff({
		min: 10,
		max: 50
	});

	t.is(b.duration(), 10);
	t.is(b.duration(), 20);
	t.is(b.duration(), 40);
	t.is(b.duration(), 50);

	b.reset();
	t.is(b.duration(), 10);
	t.is(b.duration(), 20);
});

test('Should support configurable jitter', t => {
	const b = new Backoff({
		jitter: 0.5
	});
	let d;

	d = b.duration();
	t.assert(d >= 500 && d <= 1500);
	d = b.duration();
	t.assert(d >= 1000 && d <= 3000);
	d = b.duration();
	t.assert(d >= 2000 && d <= 6000);
	d = b.duration();
	t.assert(d >= 4000 && d <= 12000);
});

test('Should support configurable factor', t => {
	const b = new Backoff({
		factor: 3
	});

	t.is(b.duration(), 1000);
	t.is(b.duration(), 3000);
	t.is(b.duration(), 9000);
	t.is(b.duration(), 27000);

	b.reset();
	t.is(b.duration(), 1000);
	t.is(b.duration(), 3000);
});
