import { Router } from 'express'
import {
  listarEmprestimos,
  buscarEmprestimo,
  criarEmprestimo,
  atualizarEmprestimo,
  removerEmprestimo
} from '../controllers/emprestimo.controller.js'

const router = Router()

router.get('/', listarEmprestimos)
router.get('/:id', buscarEmprestimo)
router.post('/', criarEmprestimo)
router.put('/:id', atualizarEmprestimo)
router.delete('/:id', removerEmprestimo)

export default router