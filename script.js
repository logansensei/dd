document.getElementById("replaceButton").addEventListener("click", function() {
    const domain = document.getElementById("domainInput").value;
    const dorks = document.querySelectorAll(".dork p.dork-link");
    
    dorks.forEach(dork => {
        // Replace the domain in the text
        const originalDork = dork.getAttribute("data-dork").replace(/targetdomain.com/g, domain);
        dork.innerHTML = originalDork;

        // Update the onclick event for each dork
        dork.onclick = function() {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(originalDork)}`;
            window.open(googleSearchUrl, '_blank');
        };
    });
});
