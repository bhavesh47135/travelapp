var attractions = [
    {
        image: "londoneye",
        name: "The London Eye",
        stations: "Waterloo, Westminster, Embankment and Charing Cross",
        cost: "Purchasing a ticket is required to ride the London Eye."
    },
    {
        image: "bigben",
        name: "Big Ben and the Houses of Parliament",
        stations: "Waterloo, Westminster, Embankment and Charing Cross",
        cost: "Purchasing a ticket is required to visit the Houses of Parliament."
    },
    {
        image: "shard",
        name: "The Shard",
        stations: "London Bridge, Borough and Monument",
        cost: "Purchasing a ticket is required to enter The Shard."
    }
]

var template =  "<article>\n\
	                <img src='/placeholder.png' data-src='/IMG.jpg' alt='NAME'>\n\
	                <h3>#POS. NAME</h3>\n\
	                <ul>\n\
	                    <li><span>Stations:</span> STATIONS </li>\n\
	                    <li><span>Cost:</span> COST </li>\n\
	                </ul>\n\
                </article>";

var content = '';

for (var i = 0; i < attractions.length; i++) {
    var entry = template.replace(/POS/g,(i+1))
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