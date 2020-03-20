$(document).ready(function(){
	//Making statistics(counters) under sidebar
	function countComments(counterSelector, elemToChange, arraySelector) {
		counterSelector.find(elemToChange).html(Array.from(arraySelector).length);
	}

	countComments($(".comments-counter"), "span", $(".comment"));

	Array.from($(".story")).map(element => {
		countComments($(element),".story-comments-counter", $(element).next(".story-comments").find(".comment"));
	})

	$(".story-articles-counter").find("span").html(Array.from($(".story")).length);

	//toggle(show/hide) full text of story
	$(".story").click(function(event) {
		let target = event.target;
		if (["comment-adding-name","show-comments-button", "add-comment-form-button", "comment-adding-text", "submit-comment-button"].indexOf(target.className) != -1) {
			event.stopPropagation();
		} else {
			$(this).children(".full-story").slideToggle();
		}
	});

	//toggle(show/hide) full text of side article
	$(".side-feature").click(function() {
		$(this).children("p").slideToggle();
	});

	//Comment showing/hiding imitation on JS
	function toggleComments(condition) {
		if (condition)  {
			$(this).parent()
				.next(".story-comments")
				.css("display", "none");
			$(this).html("Show comments");
		} else {
			$(this).parent()
				.next(".story-comments")
				.css("display", "block");
			$(this).html("Hide comments");

			//Making random (name, text) and not random(date) data to "server" comment
			$(this).parent().next().find(".serverside-comment-date").html(new Date('2020-02-22T03:24:00'));

			function getRandom() {
				return Math.floor(Math.random() * 10);
			}

			let names = ["Nick", "Paul", "John", "Mila", "Sofia", "Elena", "George", "Denise", "Kevin", "Ron"];
			let secondNames = ["Rabbit", "Bear", "Seal", "Tiger", "Dog", "Cat", "Fox", "Deer", "Orca", "Raven"];
			let commentatorName = names[getRandom()];
			let commentatorSecondName = secondNames[getRandom()];
			$(this).parent()
				.next()
				.find(".serverside-commentator-name")
				.html(`${commentatorName} ${commentatorSecondName}`);
			$(this).parent().next().find(".serverside-comment-text").html(`Hello! My name is ${commentatorName}. My friend ${names[getRandom()]} show me this story today. It was exciting, because my ${secondNames[getRandom()]} had started speaking English arter that.`);
		}
	}

	$(".show-comments-button").click(function() {
		toggleComments.call(this, ($(this).parent().next().css("display") != "none"));
	});

	//Comment adding imitation on JS
	$(".add-comment-form-button").click(function() {
		if ($(this).html() == "Add comment") {
			$(this).parent()
				.after()
				.append("<div class='comment-input'><input class='comment-adding-name' type='text' placeholder='Enter your name'><textarea class='comment-adding-text' maxlength='150' placeholder='Comment text'></textarea><input class='submit-comment-button' type='submit' value='Send Comment'></div>");
			$(this).html("Cancel");

			$(".submit-comment-button").click(function() {
				toggleComments.call($(this).parents(".story").find(".show-comments-button"), false);
				let commentatorName = $(this).parent().find(".comment-adding-name").val();
				let commentText = $(this).parent().find(".comment-adding-text").val();
				if ($(this).parent(".comment-input").find(".comment-adding-text").val() != "") {
					if (commentatorName == "") {commentatorName = "Anonymous"}
					$(this).parents(".story").find(".story-comments-counter").html(parseInt($(this).parents(".story").find(".story-comments-counter").html()) + 1);
					$(this).parents(".story")
						.next(".story-comments")
						.prepend(`<div class='comment'><h3 class='commentator'>Comment by <span class='commentator-name'>${commentatorName}</span></h3><p class='comment-date'>${Date()}</p><p class='comment-text'>${commentText}</p><button class='remove-comment-button' title='Remove comment'>X</button></div>`);
					$(this).parents(".story")
						.find(".add-comment-form-button")
						.html("Add comment");
					$(this).parents(".story")
						.find(".comment-input")
						.remove();
				}
				countComments($(".comments-counter"), "span", $(".comment"));

				//Removing comments imitation
				$(".remove-comment-button").click(function() {
					$(this).parents(".story-comments").prev(".story").find(".story-comments-counter").html(parseInt($(this).parents(".story-comments").prev(".story").find(".story-comments-counter").html()) - 1);
					$(this).parents(".comment").remove();
					countComments($(".comments-counter"), "span", $(".comment"));
				});
			});
		} else {
			$(this).parent()
				.find(".comment-input")
				.remove();
			$(this).html("Add comment");
		}
	});



	//Toggle/show more stories
	$(".toggle-stories").click(function() {
		let longtimeStoriesDisplay = $(".longtime-stories").css("display");
		if (longtimeStoriesDisplay != "none") {
			$(".longtime-stories").css("display", "none");
			$(".toggle-stories-text").html("Show more")
		} else {
			$(".longtime-stories").css("display", "block");
			$(".toggle-stories-text").html("Show less");
		}
	});
});