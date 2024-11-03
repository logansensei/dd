document.getElementById('replaceButton').addEventListener('click', () => {
    const domain = document.getElementById('domainInput').value;
    const dorks = [
        'site:*.targetdomain.com -www (inurl:staging OR inurl:dev OR inurl:test OR inurl:preprod OR inurl:internal) (intext:"environment" OR intext:"application" OR intext:"version")',
        'site:targetdomain.com (inurl:"/logs/" OR inurl:"debug.log" OR inurl:"error.log") ("index of" OR "log" OR "trace")',
        'site:targetdomain.com inurl:"/.git" ("index of" OR inurl:"/.env") ("repository" OR "config" OR "branch")',
        'site:targetdomain.com intitle:"index of" ("uploads" OR "files" OR "private" OR "userdata" OR "backups")',
        'site:targetdomain.com inurl:"/jira/" ("exception" OR "error" OR "stack trace" OR "debug")',
        'site:targetdomain.com (inurl:".ssh" OR inurl:".aws" OR inurl:".npmrc" OR inurl:".docker" OR inurl:".gitlab-ci.yml") ("private" OR "credentials" OR "secret")',
        'site:targetdomain.com filetype:log ("error" OR "warning" OR "failed to" OR "exception") -example -sample -test',
        'site:targetdomain.com ext:yaml ("kubernetes" OR "cluster" OR "apiVersion" OR "deployment" OR "service")',
        'site:trello.com inurl:targetdomain.com ("password" OR "credentials" OR "access" OR "API_KEY")',
        'site:targetdomain.com (inurl:"Dockerfile" OR inurl:"docker-compose.yml" OR inurl:".gitlab-ci.yml" OR inurl:"Jenkinsfile") (intext:"version" OR intext:"image" OR intext:"build")',
        // Add more dorks here
    ];

    const dorkList = document.getElementById('dorkList');
    dorkList.innerHTML = ''; // Clear existing dorks

    dorks.forEach(dork => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `https://www.google.com/search?q=${encodeURIComponent(dork.replace(/targetdomain\.com/g, domain))}`;
        link.target = "_blank"; // Open in a new tab
        link.className = 'dork-link';
        link.textContent = dork;
        listItem.appendChild(link);
        dorkList.appendChild(listItem);
    });
});
