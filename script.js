document.getElementById('replaceButton').addEventListener('click', () => {
    const domain = document.getElementById('domainInput').value.trim();
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
        'site:targetdomain.com inurl:"/jasperserver/" OR inurl:"/jasperserver/login" OR inurl:"/jasperserver/dashboard" OR inurl:"/jasperserver/reports" OR inurl:"/jasperserver/flow" intitle:"JasperReports" OR intitle:"JasperServer" OR intitle:"JasperReports Dashboard" OR intitle:"Report Viewer"',
        'site:targetdomain.com filetype:tf ("resource" OR "provider" OR "variable" OR "output" OR "module")',
        'site:targetdomain.com inurl:"/ords/" OR inurl:"/apex/" OR inurl:"/apex/apex/" intitle:"Oracle APEX" OR intitle:"Oracle Application Express" OR intitle:"APEX Dashboard"',
        'site:targetdomain.com inurl:"/icingaweb2/" OR inurl:"/icingaweb/" OR inurl:"/icinga/" intitle:"Icinga" OR intitle:"Icinga Web" OR intitle:"Icinga Dashboard" OR intitle:"Icinga Monitoring"',
        'site:targetdomain.com inurl:"/nocodb/" OR inurl:"/nocodb/config" OR inurl:"/nocodb/dashboard" OR inurl:"/nocodb/app" OR inurl:"/nocodb/public" intitle:"NocoDB" OR intitle:"NocoDB Dashboard" OR intitle:"NocoDB Config"',
        'site:targetdomain.com inurl:"/signalfx" OR inurl:"/signalfx/dashboard" OR inurl:"/signalfx/public" OR inurl:"/signalfx/app" intitle:"SignalFX"',
        'site:targetdomain.com inurl:"/elastalert/" filetype:yaml OR filetype:json ("alert" OR "rule" OR "configuration")',
        'site:targetdomain.com inurl:"/ipa/ui/" OR inurl:"/ipa/ui/login" OR inurl:"/ipa/ui/dashboard" intitle:"FreeIPA" OR intitle:"FreeIPA Dashboard" OR intitle:"FreeIPA UI"',
        'site:targetdomain.com inurl:"/dfshealth.html" OR inurl:"/hadoop/" OR inurl:"/hdfs/" intitle:"Hadoop" OR intitle:"HDFS" OR intitle:"Hadoop Distributed File System"',
        'site:targetdomain.com inurl:"/salt/" OR inurl:"/salt/master" OR inurl:"/salt/config" intext:"Salt Master" OR intext:"SaltStack" OR intext:"configuration"',
        'site:targetdomain.com inurl:"/rundeck/project/" OR inurl:"/rundeck/job/" OR inurl:"/rundeck/logs/" intext:"job" OR intext:"Rundeck" OR intext:"execution log"',
        'site:targetdomain.com filetype:nessus OR filetype:nvs ("vulnerability" OR "scan" OR "report" OR "plugin" OR "host")',
        'site:targetdomain.com inurl:"/cockpit/" intitle:"Cockpit" OR intitle:"Cockpit Dashboard" OR intext:"server management"',
        'site:targetdomain.com inurl:"/_search" intitle:"Elasticsearch" OR intext:"_search" OR intext:"query"',
        'site:targetdomain.com inurl:"/phpsysinfo/" OR inurl:"/phpsysinfo/index.php" intitle:"phpSysInfo" OR intitle:"phpSysInfo Dashboard" OR intitle:"System Information"',
        'site:targetdomain.com inurl:"/puppet/" OR inurl:"/puppetdb/" OR inurl:"/puppetlabs/" intitle:"Puppet Enterprise Console" OR intitle:"Puppet Dashboard"',
        'site:targetdomain.com inurl:"/harbor/" OR inurl:"/harbor/projects" OR inurl:"/harbor/login" intitle:"Harbor Registry" OR intitle:"Harbor Dashboard"',
        'site:targetdomain.com inurl:"/awx/" OR inurl:"/awx/api/" OR inurl:"/awx/login" intitle:"AWX" OR intitle:"AWX Dashboard"',
        'site:targetdomain.com inurl:"/zport/dmd/" OR inurl:"/zenoss/" intitle:"Zenoss" OR intitle:"Zenoss Dashboard" OR intitle:"Zenoss Monitoring"',
        'site:targetdomain.com inurl:"/login_up.php3" OR inurl:"/login/" intitle:"Plesk" OR intitle:"Plesk Login"',
        'site:targetdomain.com (inurl:"/v2/_catalog" OR inurl:"/v2/repositories/") intext:"dockerfile" OR intext:"image"',
        'site:targetdomain.com inurl:"/tmui/login.jsp" intitle:"BIG-IP" OR intitle:"F5 Management" OR intext:"BIG-IP Login"',
        'site:targetdomain.com inurl:"/elastichq" intitle:"ElasticHQ" OR intitle:"ElasticHQ Dashboard" OR intext:"ElasticHQ Monitoring"',
        'site:targetdomain.com inurl:"/gitea/" (intext:"repository" OR intext:"issues") OR intext:"project" OR intext:"code"',
        'site:targetdomain.com inurl:"/directus/" (intext:"database" OR intext:"config" OR intext:"settings")',
        'site:targetdomain.com inurl:"/zammad/" intitle:"Zammad" OR intitle:"Zammad Support" OR intext:"ticket"',
        'site:targetdomain.com inurl:"/app#/Spaces-1" intitle:"Octopus Deploy" OR intitle:"Octopus Dashboard" OR intext:"deployment"',
        'site:targetdomain.com inurl:"/desk" (intitle:"ERPNext" OR intitle:"Odoo") OR intext:"modules" OR intext:"apps"',
        'site:gist.github.com intext:"targetdomain.com" -site:github.com intext:"secret" OR intext:"credential"',
        'site:targetdomain.com (inurl:"/matomo/" OR inurl:"/piwik/") intitle:"Matomo" OR intitle:"Piwik" OR intext:"analytics dashboard"',
        'site:my.salesforce.com intext:"targetdomain.com" (intext:"Customer Support" OR intext:"Salesforce Login") OR inurl:"/lightning/"',
        'site:dev.azure.com intext:"targetdomain.com" (intext:"pipeline" OR intext:"repository" OR intext:"project")',
        'site:targetdomain.com inurl:"/cacti" intitle:"Cacti" OR intext:"network monitoring" -login',
        'site:targetdomain.com inurl:"/bamboo/" intitle:"Bamboo Continuous Integration" OR intitle:"Bamboo Dashboard" OR intext:"CI/CD Pipeline"',
        'site:sentry.io intext:"targetdomain.com" intext:"error" OR intext:"stacktrace" OR intext:"exception" OR intext:"message"',
        'site:targetdomain.com filetype:ovpn intext:"client" OR intext:"remote" OR intext:"dev" OR intext:"credentials"',
        'site:targetdomain.com inurl:"/nexus/" intitle:"Nexus Repository Manager" OR intitle:"Nexus Dashboard" OR intext:"repository"',
        'site:drive.google.com intext:"targetdomain.com" ("password" OR "credentials" OR "confidential" OR "secret")',
        'site:targetdomain.com inurl:"/remote.php/webdav" OR inurl:"/nextcloud/remote.php/webdav" intext:"Nextcloud" OR intext:"WebDAV"',
        'site:targetdomain.com inurl:"/share/page/" intitle:"Alfresco" OR intitle:"Alfresco Share" OR intext:"document management"',
        'site:targetdomain.com inurl:"/console/" intitle:"OpenShift" OR intitle:"OpenShift Console" OR intext:"OpenShift Management"',
        'site:targetdomain.com inurl:"/webmin" OR inurl:"/webmin/login" intitle:"Webmin" OR intitle:"Webmin Control Panel"',
        'site:targetdomain.com inurl:"/search" intitle:"Graylog" OR intext:"Graylog Search" OR intext:"search logs"',
        'site:targetdomain.com inurl:"/zabbix" intitle:"Zabbix" OR intitle:"Zabbix Dashboard" OR intext:"monitoring dashboard"',
        'site:targetdomain.com inurl:"/misp/" intitle:"MISP" OR intitle:"MISP Threat Sharing" OR intext:"MISP Dashboard"',
        'site:targetdomain.com inurl:"/_cat/" intitle:"Elasticsearch" OR intext:"_cat" OR intext:"cluster health"',
        'site:targetdomain.com inurl:"/index.php/admin" OR inurl:"/admin.php" intitle:"LiteSpeed WebAdmin Console" OR intitle:"LiteSpeed Admin"',
        'site:targetdomain.com filetype:js ("AWS_SECRET_ACCESS_KEY" OR "GCP_API_KEY" OR "AZURE_CLIENT_SECRET" OR "TOKEN")',
        'site:targetdomain.com filetype:json ("AWSTemplateFormatVersion" OR "Resources" OR "Parameters" OR "Outputs")',
        'site:targetdomain.com filetype:yaml ("hosts" OR "vars" OR "ansible_user" OR "ansible_password" OR "tasks")',
        'site:targetdomain.com inurl:"/job/" ("BUILD SUCCESSFUL" OR "BUILD FAILED" OR "Started by" OR "Console Output")',
        'site:targetdomain.com (inurl:"/_search" OR inurl:"/elastic") (intext:"cluster_name" OR intext:"status" OR intext:"index" OR intext:"document")',
        'site:targetdomain.com inurl:"/grafana/" intitle:"Grafana" (intext:"metrics" OR intext:"dashboard" OR intext:"server") -login -auth',
        'site:targetdomain.com inurl:"/redis" intitle:"Redis" (intext:"console" OR intext:"status") -login -auth',
        'site:targetdomain.com filetype:json (intext:"postman" OR intext:"collection" OR intext:"variable" OR intext:"environment")',
        'site:targetdomain.com inurl:"/admin/" intitle:"Airflow" (intext:"DAGs" OR intext:"pipeline" OR intext:"task") -login',
        'site:webex.com inurl:"/meet/" intext:"targetdomain.com" (intext:"password" OR intext:"sensitive" OR intext:"confidential")',
        'site:targetdomain.com inurl:"/script" intitle:"Jenkins Script Console" (intext:"execution" OR intext:"output" OR intext:"logs")',
        'site:targetdomain.com (inurl:"/.circleci" OR inurl:"/.github/workflows" OR inurl:"/.gitlab-ci.yml") intitle:"CI/CD" OR intext:"configuration" OR intext:"workflow"',
        'site:targetdomain.com (inurl:"/k8s/dashboard" OR inurl:"/kubernetes-dashboard") intitle:"Kubernetes" OR intext:"cluster management" OR intext:"dashboard"',
        'site:hub.docker.com intext:"targetdomain.com" (intext:"env" OR intext:"docker-compose.yml" OR intext:"configuration") -github.com',
        'site:app.datadoghq.com intext:"targetdomain.com" (inurl:"/dashboard" OR inurl:"/monitor") intitle:"DataDog" OR intext:"monitoring"',
        'site:gitlab.io intext:"targetdomain.com" (intext:"credentials" OR intext:"password" OR intext:"API_KEY" OR intext:"secret")',
        'site:console.cloud.google.com/bigquery intext:"targetdomain.com" intitle:"BigQuery" -auth -login OR intext:"public dataset"',
        'site:aws.amazon.com inurl:"/rds/" intitle:"RDS snapshot" intext:"targetdomain.com" OR intext:"snapshot" OR intext:"public"',
        'site:firebaseio.com intext:"targetdomain.com" OR intext:".firebaseio.com" ("index of" OR "database" OR "storage")',
        'site:targetdomain.com inurl:"/connectors/" OR inurl:"/kafka/" intitle:"Kafka Connect" OR intext:"connector configuration"',
        'site:targetdomain.com inurl:"/nagios" intitle:"Nagios" OR intitle:"Nagios Monitoring" OR intext:"status"',
        'site:targetdomain.com (inurl:"/sonar/" OR inurl:"/dashboard?id=") intitle:"SonarQube" OR intext:"vulnerabilities" OR intext:"quality gate"',
        'site:targetdomain.com inurl:"/prometheus/" intitle:"Prometheus Time Series" OR intext:"metrics" OR intext:"monitoring"'
]
]
    ];

    const dorkList = document.getElementById('dorkList');
    dorkList.innerHTML = ''; // Clear existing dorks

    if (domain === '') {
        alert('Please enter a domain');
        return;
    }

    dorks.forEach(dork => {
        const updatedDork = dork.replace(/targetdomain\.com/g, domain);
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `https://www.google.com/search?q=${encodeURIComponent(updatedDork)}`;
        link.target = "_blank"; // Open in a new tab
        link.className = 'dork-link';
        link.textContent = updatedDork;
        listItem.appendChild(link);
        dorkList.appendChild(listItem);
    });
});
