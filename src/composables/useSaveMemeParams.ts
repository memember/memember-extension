export const useSaveMemeParams = () => {
  const queryParams = new URLSearchParams(location.search)

  const isComingFromMenu = queryParams.get('saveMeme') === 'true'
  const imageUrl = decodeURIComponent(queryParams.get('imageUrl') || '')
  return {
    isComingFromMenu,
    imageUrl,
  }
}
