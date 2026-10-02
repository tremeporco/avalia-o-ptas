function logger(req, res, next) {
  const inicio = Date.now()

  // 'finish' dispara quando a resposta já foi enviada ao cliente
  res.on('finish', () => {
    const ms = Date.now() - inicio
    console.log(`${req.method} ${req.url} — ${ms}ms`)
  })

  next() // o fluxo segue IMEDIATAMENTE, sem esperar o log
}

export { logger }

// deve ser o ÚLTIMO app.use do arquivo
function errorHandler(err, req, res, next) {
  console.error(err.stack) // o rastro completo vai para o terminal (log do dev)

  const status = err.status || 500
  res.status(status).json({ erro: err.message || 'Erro interno' })
}

export { errorHandler }