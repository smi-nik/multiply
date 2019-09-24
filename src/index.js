const normalizeDigit = function(digit, carry) {
	digit += carry;
	const normalizedDigit = digit % 10;
	carry = Math.floor(digit / 10);
	return { normalizedDigit, carry };
};

const normalizeNumber = function(digits) {
	let carry = 0;
	const normalized = digits
	.reverse()
	.map(digit => {
		const normalized = normalizeDigit(digit, carry);
		carry = normalized.carry;
		return normalized.normalizedDigit;
	})
	.reverse();

	if (carry) normalized.unshift(carry);
	return normalized;
};

module.exports = function multiply([...first], [...second]) {
	// your solution
	const result = [];

	second.reverse().forEach(secondDigit => {
	const multipliedWithCarry = first.map(firstDigit => firstDigit * secondDigit);
	result.push(normalizeNumber(multipliedWithCarry));
	});

	return result
	.reduce((prev, curr, index) => {
		for (let i = 0; i < index; i++) {
			curr.push(0);
			if (prev.length < curr.length) prev.unshift(0);
		}

		prev = prev.map((digit, index) => digit + curr[index]);
		return normalizeNumber(prev);
	})
	.join("");
};