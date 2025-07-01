export class WineClass {
  id?: string;
  nome: string;
  tipo: string;
  regiao: string;
  status: 'experimented' | 'desired';
  rating: number | null;
  anotation: string | null;
  createdAt: Date;
  createdBy: string;

  constructor(
    nome: string,
    tipo: string,
    regiao: string,
    status: 'experimented' | 'desired',
    createdBy: string,
    rating: number | null = null,
    anotation: string | null = null,
    id?: string,
    createdAt?: Date
  ) {
    this.nome = nome;
    this.tipo = tipo;
    this.regiao = regiao;
    this.status = status;
    this.rating = status === 'experimented' ? rating : null;
    this.anotation = anotation ?? null;
    this.createdAt = createdAt ?? new Date();
    this.createdBy = createdBy;
    if (id) this.id = id;
  }

  validate() {
    if (!this.nome || !this.tipo || !this.regiao) {
      throw new Error('Nome, tipo e região são obrigatórios.');
    }
  }

  update(newData: Partial<WineClass>) {
    Object.assign(this, newData);
  }

  formatCreatedAt() {
    return this.createdAt.toLocaleDateString();
  }
}