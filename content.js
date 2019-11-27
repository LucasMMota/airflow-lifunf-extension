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
                formmated_log_txt = paint_errors(urlify(log_text))
                $('body > .container .tab-pane.active pre code').html(formmated_log_txt)
                clearInterval(getTextInterval)
              }
              log_text = $('body > .container .tab-pane.active pre code').html()
            }, 300))();
    }
}

let urlify = (text)=> text.replace(/(https?:\/\/[^\s]+)/g, (url) => '<a href="' + url + '" target="blank">' + url + '</a>')

let paint_errors = (text) => {
    miolo = text.replace(/\[.*\]\s.*ERROR.*(\r|\n)/g, (str_line) => '<span class="af-lilfunf-error-highlight">' + str_line + '</span>')
    new_text = '<span>'
    new_text += miolo
    new_text += '</span>'
    return new_text
}
