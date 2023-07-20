async function fetchWhoisData(domain: string, apiKey: string) {
    const apiUrl = `https://www.whoisxmlapi.com/whoisserver/WhoisService?apiKey=${apiKey}&domainName=${domain}&outputFormat=JSON`;
    console.log(apiUrl);
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {
        const data = await response.json();
        console.log(JSON.stringify(data));
        // Extract and display the relevant WHOIS data, e.g., owner and IP.
        const owner = data?.WhoisRecord?.registrant?.name || "N/A";
        const doamin_name = data?.WhoisRecord?.domainName || "N/A";
        // return `Domain Owner: ${owner}\nDomain Name: ${doamin_name}`;
        return JSON.stringify(data);
      } else {
        return "Failed to fetch WHOIS data.";
      }
    } catch (error) {
      return `Error fetching WHOIS data: ${error}`;
    }
  }
  
  async function getCurrentSiteWhois() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab || !tab.url) {
        console.error("Error: Unable to retrieve the URL of the active tab.");
        return;
      }
  
      const currentUrl = new URL(tab.url);
      const domain = currentUrl.hostname;
  
      const apiKey = "at_30ItbCPqQfc1LHIXiejFMSYgUJW93"; // Replace with your actual API key
      const whoisInfo = await fetchWhoisData(domain, apiKey);
  
      const whoisInfoElement = document.getElementById("whois-info");
      if (whoisInfoElement) {
        whoisInfoElement.textContent = whoisInfo;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  document.addEventListener("DOMContentLoaded", getCurrentSiteWhois);
  
  
  document.addEventListener("DOMContentLoaded", getCurrentSiteWhois);
  