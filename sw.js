self.addEventListener('fetch', function(event) {
  // url ending in ".jpg"
if(event.request.url.endsWith('teamId='))
{
  console.log(event.response);
  event.respondWith(
  new Response({
    headers: {'Access-Control-Allow-Origin:': 'tested'}
}));
}
});
