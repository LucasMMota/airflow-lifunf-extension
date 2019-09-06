console.info('Airflow lifUnf is activated')

AUTO_REFRESH_HASH = '#auto-refresh'

isAutoRefreshEnabled = ()=>{
    return location.hash.indexOf(AUTO_REFRESH_HASH) != -1
}

btnTitle = isAutoRefreshEnabled()? 'Turn Off': 'Auto Refresh'
btnHref = isAutoRefreshEnabled()? '': '#auto-refresh'
autoRefreshButton = '<li>'
autoRefreshButton +=   '<a id="auto_refresh" href="'+btnHref+'">'
autoRefreshButton +=   '<span class="glyphicon glyphicon-repeat" aria-hidden="true" data-original-title="" title="">'
autoRefreshButton +=   '</span> '+btnTitle+'</a>'
autoRefreshButton +='</li>'
$('ul.nav.nav-pills').append(autoRefreshButton)

setInterval(()=>{
    if (isAutoRefreshEnabled())
        location.reload()
}, 1500);

function createAutoRefreshInterval() {
  return setInterval(()=>{
  if (isAutoRefreshEnabled())
      location.reload()
  }, 3000);
}
