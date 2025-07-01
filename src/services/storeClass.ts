import "firebase/firestore";
export class StoreClass {
  id?: string;
  name: string;
  type: 'Física' | 'Online';
  address: string;
  contact: string;
  notes: string;
  createdAt: Date;
  createdBy: string;
  userId: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  place_id?: string;

  constructor(
    name: string,
    type: 'Física' | 'Online',
    address: string,
    contact: string,
    notes: string,
    createdBy: string,
    userId: string,
    id?: string,
    place_id?: string
  ) {
    this.name = name;
    this.type = type;
    this.address = address;
    this.contact = contact;
    this.notes = notes;
    this.createdBy = createdBy;
    this.userId = userId;
    this.createdAt = new Date();
    if (id) this.id = id;
    if (place_id) this.place_id = place_id;
  }

  validate() {
    if (!this.name || !this.type) {
      throw new Error('Nome e Tipo são obrigatórios.');
    }
  }

  update(newStore: Partial<StoreClass>) {
    Object.assign(this, newStore);
  }

  formatCreatedAt() {
    return this.createdAt.toLocaleDateString();
  }
}