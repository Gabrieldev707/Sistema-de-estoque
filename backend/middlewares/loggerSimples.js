const logger = (req, res, next) => {
  // Marca a hora de início
  const start = Date.now();
  const data = new Date().toISOString();

  // Cores
  const reset = "\x1b[0m";
  const cyan = "\x1b[36m";
  const yellow = "\x1b[33m";
  const green = "\x1b[32m";
  const red = "\x1b[31m";

  // Log de ENTRADA (Igual o seu)
  console.log('\n'); 
  console.log(`${cyan}>>> RECEBENDO REQUISIÇÃO -------------------${reset}`);
  console.log(`${green}DATA:${reset}   ${data}`);
  console.log(`${yellow}MÉTODO:${reset} ${req.method}`);
  console.log(`${yellow}URL:${reset}    ${req.url}`);

  // --- A MÁGICA: Escuta quando a resposta for enviada ---
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? red : green; // Vermelho se erro, Verde se sucesso

    console.log(`${statusColor}STATUS:${reset}  ${res.statusCode}`);
    console.log(`${cyan}TEMPO:${reset}   ${duration}ms`);
    console.log(`${cyan}------------------------------------------${reset}\n`);
  });
  
  next(); 
};

module.exports = logger;