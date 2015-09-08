//this is simply a function that returns an object
//with a talkToTheHand function, which in turn grabs
//a quote from the quoteSource
module.exports = function(quoteSource) {
	return {
		talkToTheHand: function() {
			return quoteSource();
		}
	};
};
