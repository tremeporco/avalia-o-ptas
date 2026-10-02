import { emprestimosModel } from '../models/emprestimo.model.js'

function validarDados(dados) {
  for (const campo of ['nomeAluno', 'livro']) {
    if (typeof dados[campo] !== 'string' || !dados[campo].trim()) {
      const erro = new Error(`O campo ${campo} é obrigatório`)
      erro.status = 400
      throw erro
    }
  }
}

export async function listarEmprestimos(req, res, next) {
  try {
    res.json(await emprestimosModel.findAllAtivos())
  } catch (erro) {
    next(erro)
  }
}

export async function buscarEmprestimo(req, res, next) {
  try {
    const emprestimo = await emprestimosModel.findById(Number(req.params.id))
    if (!emprestimo) return res.status(404).json({ erro: 'Empréstimo não encontrado' })
    res.json(emprestimo)
  } catch (erro) {
    next(erro)
  }
}

export async function criarEmprestimo(req, res, next) {
  try {
    validarDados(req.body)
    const novoEmprestimo = await emprestimosModel.create({
      nomeAluno: req.body.nomeAluno.trim(),
      livro: req.body.livro.trim(),
      devolvidoEm: null
    })
    res.status(201).json(novoEmprestimo)
  } catch (erro) {
    next(erro)
  }
}

export async function atualizarEmprestimo(req, res, next) {
  try {
    validarDados(req.body)
    const atualizado = await emprestimosModel.update(Number(req.params.id), {
      nomeAluno: req.body.nomeAluno.trim(),
      livro: req.body.livro.trim()
    })
    if (!atualizado) return res.status(404).json({ erro: 'Empréstimo não encontrado' })
    res.json(atualizado)
  } catch (erro) {
    next(erro)
  }
}

export async function removerEmprestimo(req, res, next) {
  try {
    const removido = await emprestimosModel.remove(Number(req.params.id))
    if (!removido) return res.status(404).json({ erro: 'Empréstimo não encontrado' })
    res.json(removido)
  } catch (erro) {
    next(erro)
  }
}
