import { CustomerRepository } from "@/appointment/application/repositories/customer-repository";
import { Customer } from "@/appointment/enterprise/entities/customer";

export class CustomerRepositoryInMemory implements CustomerRepository {
  items: Customer[] = []

  async findByCpf(cpf: string): Promise<Customer | undefined> {
    return this.items.find((customer: Customer) => customer.cpf.isEqual(cpf))
  }

  async save(customer: Customer): Promise<void> {
    this.items.push(customer)
  }

  async findById(id: string): Promise<Customer | undefined> {
    return this.items.find((customer: Customer) => customer.id.isEqual(id))
  }
}