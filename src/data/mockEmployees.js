/**
 * Funcionários responsáveis por danos — dados mockados.
 * TODO: Cadastro completo de garçons e funcionários via Firebase
 */
export const RESPONSAVEL_PADRAO = 'nao_identificar';

export const FUNCIONARIOS = [
  { id: 'nao_identificar', nome: 'Não identificar' },
  { id: 'joao', nome: 'João', cargo: 'Garçom' },
];

export function getFuncionarioById(id) {
  return FUNCIONARIOS.find((f) => f.id === id) ?? FUNCIONARIOS[0];
}
