import should from 'should';
import jsdom from 'jsdom';
import got from 'got';

const { JSDOM } = jsdom;

const url = 'https://al3xback.github.io/fmentor-single-price-mocha-shouldjs/';

const getData = () => {
	return got(url)
		.then((res) => {
			const { document } = new JSDOM(res.body).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

describe('DOM', () => {
	beforeEach(async () => {
		try {
			const document = await getData();
			global.document = document;

			const whyUsPoints = [
				'Tutorials by industry experts',
				'Peer & expert code review',
				'Coding exercises',
				'Access to our GitHub repos',
				'Community forum',
				'Flashcard decks',
				'New videos every week',
			];
			global.whyUsPoints = whyUsPoints;
		} catch (err) {
			console.log(err);
		}
	});

	it("should have a word 'Coding exercises' as one of why us points", () => {
		whyUsPoints.should.containEql('Coding exercises');
	});

	it("should not have a word 'Tutorials by unknown experts' as one of why us points", () => {
		whyUsPoints.should.not.containEql('Tutorials by unknown experts');
	});

	it("should have a word 'New videos every week' as one of why us points", () => {
		'New videos every week'.should.be.equalOneOf(...whyUsPoints);
	});

	it("should not have a word 'Limited access to our GitHub repos' as one of why us points", () => {
		'Limited access to our GitHub repos'.should.not.be.equalOneOf(
			whyUsPoints
		);
	});
});
