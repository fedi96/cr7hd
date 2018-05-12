self.addEventListener('fetch', function(event) {
  // url ending in ".jpg"
if(event.request.url.endsWith('teamId='))
{
  event.respondWith(
  new Response(event.response, {
    headers: {'Access-Control-Allow-Origin:': 'tested'}
}));
}
});
