import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 50; i++) {
    await prisma.shopItem.create({
        data: {
            name: faker.science.chemicalElement().name,
            purity: faker.number.float({min: 0.7}),
            price: faker.number.int({min: 1500, max: 25000}),
            rating: faker.number.int({min: 1, max:5})
        }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })