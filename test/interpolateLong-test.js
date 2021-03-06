var tape = require("tape"),
		color = require("d3-color"),
		interpolate = require("../"),
		jab = interpolate.jab;

tape("interpolateJabLong(a, b) converts a and b to Jab colors", function(test) {
	test.equal(interpolate.interpolateJabLong("steelblue", "brown")(0), color.rgb("steelblue") + "");
	test.equal(interpolate.interpolateJabLong("steelblue", jab("brown"))(1), color.rgb("brown") + "");
	test.equal(interpolate.interpolateJabLong("steelblue", color.rgb("brown"))(1), color.rgb("brown") + "");
	test.end();
});

tape("interpolateJabLong(a, b) interpolates in Jab and returns an RGB string", function(test) {
	test.equal(interpolate.interpolateJabLong("steelblue", "#f00")(0.5), "rgb(164, 114, 124)");
	test.equal(interpolate.interpolateJabLong("rgba(70, 130, 180, 1)", "rgba(255, 0, 0, 0.2)")(0.2), "rgba(119, 125, 149, 0.84)");
	test.end();
});

tape("interpolateJabLong(a, b) uses the shortest path when interpolating hue", function(test) {
	var i = interpolate.interpolateJabLong(jab(50,30,20), jab(45,-10,-25));
	test.equal(i(0.0), "rgb(197, 51, 26)");
	test.equal(i(0.2), "rgb(169, 77, 70)");
	test.equal(i(0.4), "rgb(140, 92, 101)");
	test.equal(i(0.6), "rgb(115, 100, 119)");
	test.equal(i(0.8), "rgb(92, 103, 138)");
	test.equal(i(1.0), "rgb(42, 106, 173)");
	test.end();
});

tape("interpolateJabLong(a, b) uses a’s hue when b’s hue is undefined", function(test) {
	test.equal(interpolate.interpolateJabLong("#f60", "#000")(0.5), "rgb(111, 59, 32)");
	test.end();
});

tape("interpolateJabLong(a, b) uses b’s hue when a’s hue is undefined", function(test) {
	test.equal(interpolate.interpolateJabLong("#000", "#f60")(0.5), "rgb(111, 59, 32)");
	test.end();
});


tape("interpolateJabLong(a, b) uses a’s saturation when b’s saturation is undefined", function(test) {
	test.equal(interpolate.interpolateJabLong("#ccc", "#000")(0.5), "rgb(94, 94, 94)");
	test.equal(interpolate.interpolateJabLong("#f00", "#000")(0.5), "rgb(110, 40, 28)");
	test.end();
});

tape("interpolateJabLong(a, b) uses b’s saturation when a’s saturation is undefined", function(test) {
	test.equal(interpolate.interpolateJabLong("#000", "#ccc")(0.5), "rgb(94, 94, 94)");
	test.equal(interpolate.interpolateJabLong("#000", "#f00")(0.5), "rgb(110, 40, 28)");
	test.end();
});

tape("interpolateJabLong(a, b) uses b’s lightness when a’s lightness is undefined", function(test) {
	test.equal(interpolate.interpolateJabLong(null, jab(16, 100, 57))(0.5), "rgb(120, 0, 58)");
	test.end();
});

tape("interpolateJabLong(a, b) uses a’s lightness when b’s lightness is undefined", function(test) {
	test.equal(interpolate.interpolateJabLong(jab(16, 100, 57), null)(0.5), "rgb(120, 0, 58)");
	test.end();
});

