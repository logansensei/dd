document.getElementById("replaceButton").addEventListener("click", function() {
    const domain = document.getElementById("domainInput").value;
    const dorks = document.querySelectorAll(".dork p");
    dorks.forEach(dork => {
        dork.innerHTML = dork.innerHTML.replace(/targetdomain.com/g, domain);
    });
});
