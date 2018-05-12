self.addEventListener('fetch', function(event) {
  // url ending in ".jpg"
if(event.request.url.endsWith('teamId='))
{
  var req = new Request(request.url, {
    method: request.method,
    headers: {'Origin': 'null'},
    mode: 'same-origin', // need to set this properly
    credentials: request.credentials,
    redirect: 'manual'   // let browser handle redirects
});
}
});
