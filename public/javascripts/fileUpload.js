const rootStyles = window.getComputedStyle(document.documentElement)

if (rootStyles.getPropertyValue('--quote-quoter-width-large') != null && rootStyles.getPropertyValue('--quote-quoter-width-large') !== '') {
  ready()
} else {
  document.getElementById('main-css').addEventListener('load', ready)
}

function ready() {
  const quoterWidth = parseFloat(rootStyles.getPropertyValue('--quote-quoter-width-large'))
  const quoterAspectRatio = parseFloat(rootStyles.getPropertyValue('--quote-quoter-aspect-ratio'))
  const quoterHeight = quoterWidth / quoterAspectRatio
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,
  )

  FilePond.setOptions({
    stylePanelAspectRatio: 1 / quoterAspectRatio,
    imageResizeTargetWidth: quoterWidth,
    imageResizeTargetHeight: quoterHeight
  })
  
  FilePond.parse(document.body)
}