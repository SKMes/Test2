//Parse related keys
var PARSE_APP = "4u8agyvws89WdMZ2ePhgW1v0KXZbz9bXFZ9w4LEi";
var PARSE_JS = "5ccGTKT1ocK1V8JCdBxzmMxKcLoZTG0BSFM3L2Yr";

$(document).ready(function() {
	Parse.initialize(PARSE_APP, PARSE_JS);
				
	console.log("PARSE_APP = " + PARSE_APP);
	console.log("PARSE_JS = " + PARSE_JS);
				
	NoteObject = Parse.Object.extend("NoteObject");

	function getNotes() {
		var query = new Parse.Query(NoteObject);

		query.find({
			success:function(results) {
				console.dir(results);
				var s = "";
				for(var i=0, len=results.length; i<len; i++) {
					var note = results[i];
					s += "<p>";
					s += "<b>"+note.get("title")+"</b><br/>";
					s += "<b>Written "+note.createdAt + "<br/>";
					s += note.get("body");
					s += "</p>";
				}
				$("#notes").html(s);
			},
			error:function(error) {
				alert("Error when getting notes!");
			}
		});
	}

	$("#addNoteBtn").on("touchend", function(e) {
		e.preventDefault();

		//Grab the note details, no real validation for now
		var title = $("#noteTitle").val();
		var body = $("#noteBody").val();

		var note = new NoteObject();
		note.save({title:title, body:body}, {
			success:function(object) {
				console.log("Saved the object!");
				$("#noteTitle").val("");
				$("#noteBody").val("");
				getNotes();
			}, 
			error:function(object,error) {
				console.dir(error);
				alert("Sorry, I couldn't save it.");
			}
		});
	});

	//call getNotes immediately
	getNotes();

});