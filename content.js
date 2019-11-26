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
}, 5000);

let createAutoRefreshInterval = () => setInterval(
    ()=>{
      if (isAutoRefreshEnabled())
          location.reload()
    }, 1500);

$(document).ready(()=>{
    apply_links_on_logs_page()
})

let apply_links_on_logs_page = ()=>{
    if (window.location.href.indexOf('/admin/airflow/log') != -1) {
        log_text = ''

        // wait content to be loaded
        let getTextInterval = (() => setInterval(
            () => {
              if (log_text != ''){
                $('body > .container .tab-pane.active pre code').html(urlify(log_text))
                clearInterval(getTextInterval)
              }
              log_text = $('body > .container .tab-pane.active pre code').html()
            }, 300))();
    }
}

let urlify = (text)=> {
    let urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => '<a href="' + url + '" target="blank">' + url + '</a>')
}