$(document).ready(function() {
    $("#next-quote").on("click", getQuote);
    getQuote();
});

function getQuote() {

    $.ajax("//api.forismatic.com/api/1.0/?method=getQuote&lang="+lang+"&format=jsonp", {
        method: "GET",
        dataType: "jsonp",
        jsonp: "jsonp",
        jsonpCallback: "parseQuote"
    });

}

function parseQuote(res) {
    if (typeof(res) === "string") res = JSON.parse(res);
    currentQuote = res.quoteText;
    currentAuthor = res.quoteAuthor;
    animateQuoteBox($(".quote-box"));
}

function animateQuoteBox(element) {
    animateElement(element, "fadeOutLeft", function() {
        $("#text").text(currentQuote);
        $("#author").text(currentAuthor);
        animateElement(element, "fadeInRight");
    });
}

function animateElement(element, transition, callback) {
    element.addClass("animated "+transition)
        .one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
            $(this).removeClass("animated "+transition);
            if (callback) callback();
        });
}