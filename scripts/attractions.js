var attractions = [
    {
        image: "londoneye",
        name: "The London Eye",
        stations: "Waterloo, Westminster, Embankment and Charing Cross",
        cost: "Purchasing a ticket is required to ride the London Eye.",
        url: "london-eye"
    },
    {
        image: "bigben",
        name: "Big Ben and the Houses of Parliament",
        stations: "Waterloo, Westminster, Embankment and Charing Cross",
        cost: "Purchasing a ticket is required to visit the Houses of Parliament.",
        url: "big-ben"
    },
    {
        image: "buckingham-palace",
        name: "Buckingham Palace",
        stations: "Green Park, Hyde Park Corner, Victoria and St. James's Park",
        cost: "You can book a visit to the Palace at various price.",
        url: "buckingham-palace"
    },
    {
        image: "shard",
        name: "The Shard",
        stations: "London Bridge, Borough and Monument",
        cost: "Purchasing a ticket is required to enter The Shard.",
        url: "the-shard"
    },
    {
        image: "harrods",
        name: "Harrods",
        stations: "Knightsbridge and Hyde Park Corner",
        cost: "It's a department store so of course free to enter!",
        url: "harrods"
    },
    {
        image: "selfridges",
        name: "Selfridges",
        stations: "Bond Street and Tottenham Court Road",
        cost: "It's a department store so of course free to enter!",
        url: "selfridges"
    },
    {
        image: "madam-tussauds",
        name: "Madame Tussauds",
        stations: "Baker Street, Regent's Park and Marylebone",
        cost: "Purchasing a ticket is required to enter Madame Tussauds.",
        url: "madame-tussauds"
    }
]

var template = "<div class=attractionsList>\n\
                    <img class=attractionImg src='/placeholder.png' data-src='/IMG.jpg' onclick=javascript:location.href='URL'>\n\
                    <h3>NAME</h3>\n\
                    <span class='attractionText'>Stations: STATIONS</span>\n\
                    <span class='attractionText'>Cost: COST</span>\n\
                </div>";

var content = '';

for (var i = 0; i < attractions.length; i++) {
    var entry = template
    .replace(/URL/g,attractions[i].url)
    .replace(/IMG/g,attractions[i].image)
	.replace(/NAME/g,attractions[i].name)
	.replace(/STATIONS/g,attractions[i].stations)
	.replace(/COST/g,attractions[i].cost);
	entry = entry.replace('<a href=\'http:///\'></a>','-');
	content += entry;
};
document.getElementById('content').innerHTML = content;

let imagesToLoad = document.querySelectorAll('img[data-src]');
const loadImages = (image) => {
    image.setAttribute('src', image.getAttribute('data-src'));
    image.onload = () => {
        image.removeAttribute('data-src');
    };
};

if('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((items, observer) => {
        items.forEach((item) => {
            if(item.isIntersecting) {
                loadImages(item.target);
                observer.unobserve(item.target);
            }
        });
    });
    imagesToLoad.forEach((img) => {
        observer.observe(img);
    });
} else {
    imagesToLoad.forEach((img) => {
            loadImages(img);
    });
}