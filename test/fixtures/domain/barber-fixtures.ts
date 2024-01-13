import { Barber } from "@/appointment/enterprise/entities/barber";

export class BarberFixtures { 
  static generate() {
    return Barber.create({
      name: "Wagner",
      cpf: "115.598.810-89",
      email: "wagner@email.com",
      password: "123456"
    })
  }
}