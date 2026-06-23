import { STORAGE_KEYS } from '../utils/constants';
import { storageService } from './storageService';

/**
 * Serviço de autenticação simulada.
 * TODO: Integrar Firebase Authentication
 * TODO: Implementar controle de permissões por perfil (admin, operador, visualizador)
 */
export const authService = {
  login(username, password) {
    // Simulação – qualquer credencial redireciona
    const session = {
      usuario: username || 'Operador GM',
      setor: 'Governança / Stewarding',
      loginAt: new Date().toISOString(),
      // Futuro: role, permissions, uid
      role: 'operador',
    };
    storageService.set(STORAGE_KEYS.SESSION, session);
    return session;
  },

  logout() {
    storageService.remove(STORAGE_KEYS.SESSION);
  },

  getSession() {
    return storageService.get(STORAGE_KEYS.SESSION);
  },

  isAuthenticated() {
    return Boolean(this.getSession());
  },
};
