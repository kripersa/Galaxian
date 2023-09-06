export const createApp = (width = 600 , height = 600, color = '0x65d2eb') => {
  let app = new PIXI.Application({
    width: width,
    height: height,
    antialias: true,
    backgroundColor: color,
    resolution: window.devicePixelRatio,
    autoDensity: true,
  })

  globalThis.__PIXI_APP__ = app
  return app
}
