function convert(csv){

	// Split lines into records
	var records = csv.split('\n');

	// Iterate through records
	for (var i = 0; i < records.length; i++) {

		// Split records at the commas into array
		var elements = records[i].split(',');

		// Convert array into object
		records[i] = {
			celsius: parseFloat(elements[0]),
			light: parseFloat(elements[1]),
			moisture: parseFloat(elements[2]),
			timeStamp: elements[3]
		};
	}

	return {data: records};
}

exports.convert = convert;