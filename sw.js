self.addEventListener('fetch', function(event) {
  // url ending in ".jpg"
if(event.request.url.endsWith('teamId='))
{
  new Response(response.body, {
    headers: {'Access-Control-Allow-Origin:': 'tested'},
});
}
});
