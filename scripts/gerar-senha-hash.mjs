/**
 * Gera o valor de PAINEL_SENHA_HASH para uma senha.
 *
 * Uso:
 *   node scripts/gerar-senha-hash.mjs
 *
 * A senha é lida da entrada padrão — nunca como argumento — para não ficar no
 * histórico do shell nem visível na lista de processos do sistema.
 *
 * Cole o valor impresso em PAINEL_SENHA_HASH (no `.env.local` e nas variáveis
 * de ambiente da Vercel). A senha em si não fica guardada em lugar nenhum.
 */
import { createInterface } from "node:readline";

import { gerarHashDeSenha } from "../lib/painel-senha.ts";

const leitor = createInterface({ input: process.stdin, terminal: false });

let senha = "";
for await (const linha of leitor) {
  senha = linha;
  break;
}

senha = senha.trim();

if (!senha) {
  console.error("Nenhuma senha recebida. Use: node scripts/gerar-senha-hash.mjs");
  process.exit(1);
}

if (senha.length < 12) {
  console.error(`Senha curta demais (${senha.length} caracteres). Use pelo menos 12.`);
  process.exit(1);
}

console.log(await gerarHashDeSenha(senha));
