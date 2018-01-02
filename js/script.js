var lang;
var currentQuote;
var currentAuthor;

$(document).ready(function () {
    lang = "en";
    $("#next-quote").on("click", getQuote);
    $("#toggle-lang").on("click", toggleLang);
    getQuote();
});

function toggleLang() {
    lang = lang == "en" ? "ru" : "en";
    switch (lang) {
        case "en":
            document.title = "Random Quote Machine";
            $("#page-title").text("The Thoughts of Your Life");
            $("#next-quote").text("More");
            $("#toggle-lang").text("Ru");
            $("#tweet-quote").attr("title", "Tweet this quote!");
            break;
        case "ru":
            document.title = "Автомат случайных цитат";
            $("#page-title").text("Мысли твоей жизни");
            $("#next-quote").text("Ещё");
            $("#toggle-lang").text("En");
            $("#tweet-quote").attr("title", "Твитнуть эту мысль!");
            break;
    }
    getQuote();
}

function getQuote() {

    $.ajax("//api.forismatic.com/api/1.0/?method=getQuote&lang=" + lang + "&format=jsonp", {
        method: "GET",
        dataType: "jsonp",
        jsonp: "jsonp",
        jsonpCallback: "parseQuote"
    });

}

function parseQuote(res) {
    if (typeof (res) === "string") res = JSON.parse(res);
    currentQuote = res.quoteText;
    currentAuthor = res.quoteAuthor;
    setupShareButtons();
    animateQuoteBox($(".quote-box"));
}

function setupShareButtons() {
    $("#tweet-quote").attr("href", "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="
        + encodeURIComponent("\"" + currentQuote + "\" " + currentAuthor));
}

function animateQuoteBox(element) {
    animateElement(element, "fadeOutLeft", function () {
        $("#text").text(currentQuote);
        $("#author").text(currentAuthor);
        animateElement(element, "fadeInRight");
    });
}

function animateElement(element, transition, callback) {
    element.addClass("animated " + transition)
        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            $(this).removeClass("animated " + transition);
            if (callback) callback();
        });
}