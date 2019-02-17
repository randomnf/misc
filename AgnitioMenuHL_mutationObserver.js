$(function() {
    var slideShowsViewport = document.getElementById("slideshows"),

        slidesAr = [],

        slideShowsViewportObserver = new MutationObserver(slideShowsViewportCallback),
        observerConfig = {
            attributes: true,
            attributeFilter: ["class"],
            childList: true,
            subtree: true
        };

    slideShowsViewportObserver.observe(slideShowsViewport, observerConfig);

    function slideShowsViewportCallback(mutationsList)
    {
        // console.log("slideShowsViewportCallback; mutationsList", mutationsList);

        var nodes = mutationsList[0].addedNodes;

        for(var i = 0; i < nodes.length; i++)
        {
            if( slidesAr.indexOf(nodes[i]) === -1 )
            {
                slidesAr.push(nodes[i]);

                addMutationObserver(nodes[i]);
            }
        }
    }

    function addMutationObserver(node)
    {
        var slideObserver = new MutationObserver(slideCallback),
            config = { attributes: true, attributeFilter: ["class"] };

            slideObserver.observe(node, config);
    }

    function slideCallback(mutationsList)
    {
        // console.log("slideCallback; mutationsList", mutationsList);

        var path = app.getPath();

        menuHighlightHandler(path);
    }
});

/**
 * Highlight menu button respective to current presenation section.
 * 
 * @param {String} path Value from app.getPath() - "section/slideID"
 */
function menuHighlightHandler(path)
{
    //console.log("menuHighlightHandler fn; path = '" + path + "'");

    var btnToHLClass = "",
        pathAr = path.split("/");

    switch(pathAr[0])
    {
        case "section1":
            btnToHLClass = pathAr[1] === "ipad-01-sl" ?
                            ".menu-custom__btn_home" :
                            ".menu-custom__btn_aduvant";
            break;
        case "section2":
            btnToHLClass = ".menu-custom__btn_neoaduvant";
            break;
        case "section3":
            btnToHLClass = ".menu-custom__btn_gerz";
            break;
        case "section4":
            btnToHLClass = ".menu-custom__btn_mrmzh";
            break;
        case "section5":
            btnToHLClass = ".menu-custom__btn_aphinity";
            break;
        case "section6":
            btnToHLClass = ".menu-custom__btn_additional";
            break;
        case "calculator":
            btnToHLClass = ".menu-custom__btn_calc";
            break;
        case "email":
            btnToHLClass = ".menu-custom__btn_email";
            break;
        default:
            break;
    }

    if(btnToHLClass === ".menu-custom__btn_home")
    {
        $(".js-hide-oh-home").css({"display": "none"});
    }
    else
    {
        $(".js-hide-oh-home").css({"display": "block"});
    }

    $(".menu-custom__btn").removeClass("menu-custom__btn_active");
    if(btnToHLClass !== "")
    {
        $(btnToHLClass).addClass("menu-custom__btn_active");
    }
    else
    {
        console.log("%cERROR in menuHighlightHandler fn: button class to highlight have not been set. Check your switch construction.", "color: red;");
    }
}