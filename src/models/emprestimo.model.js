import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const arquivo = resolve('src/data.json')

async function lerEmprestimos() {
  try {
    return JSON.parse(await readFile(arquivo, 'utf8'))
  } catch (erro) {
    if (erro.code === 'ENOENT') return []
    throw erro
  }
}

async function salvarEmprestimos(emprestimos) {
  await writeFile(arquivo, JSON.stringify(emprestimos, null, 2) + '\n')
}

export const emprestimosModel = {
  async findAllAtivos() {
    return (await lerEmprestimos()).filter((emprestimo) => !emprestimo.devolvidoEm)
  },

  async findById(id) {
    const emprestimo = (await lerEmprestimos())
      .find((item) => item.id === id && !item.devolvidoEm)
    return emprestimo || null
  },

  async create(dados) {
    const emprestimos = await lerEmprestimos()
    const id = emprestimos.length
      ? Math.max(...emprestimos.map((emprestimo) => emprestimo.id)) + 1
      : 1
    const novoEmprestimo = { id, ...dados }
    emprestimos.push(novoEmprestimo)
    await salvarEmprestimos(emprestimos)
    return novoEmprestimo
  },

  async update(id, dados) {
    const emprestimos = await lerEmprestimos()
    const indice = emprestimos.findIndex((item) => item.id === id && !item.devolvidoEm)
    if (indice === -1) return null
    emprestimos[indice] = { ...emprestimos[indice], ...dados }
    await salvarEmprestimos(emprestimos)
    return emprestimos[indice]
  },

  async remove(id) {
    const emprestimos = await lerEmprestimos()
    const indice = emprestimos.findIndex((item) => item.id === id && !item.devolvidoEm)
    if (indice === -1) return null
    emprestimos[indice].devolvidoEm = new Date().toISOString()
    await salvarEmprestimos(emprestimos)
    return emprestimos[indice]
  }
}
