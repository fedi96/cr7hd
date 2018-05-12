
  addEventListener('fetch', event => {
  event.respondWith(fetchAndLog(event.request))
})
async function fetchAndLog(request) {
  console.log('Got request', request)
  const response = await fetch(request)
  console.log('Got response', response)
  return response
}
